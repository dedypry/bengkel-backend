import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { IAuth } from 'utils/interfaces/IAuth';
import {
  BulkCategoryUpdateDto,
  CategoryQueryDto,
  CreateCategoryDto,
} from './dto/categories.dto';
import slugify from 'slugify';
import { fn, raw, type Transaction } from 'objection';
import { ProductsModel } from 'models/products.model';

interface SlugOptions {
  excludeId?: number;
  trx?: Transaction;
  reservedSlugs?: Set<string>;
}

@Injectable()
export class CategoriesService {
  async list(query: CategoryQueryDto, auth: IAuth) {
    const sortBy = query.sortBy || 'created_at';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    const allowedSortColumns = ['name', 'created_at', 'total_product'];

    const productCountSql = `(
      SELECT COUNT(*)::int
      FROM products
      WHERE products.deleted_at IS NULL
        AND products.category_id IN (
          SELECT pc.id
          FROM product_categories pc
          WHERE pc.deleted_at IS NULL
            AND (pc.id = product_categories.id OR pc.parent_id = product_categories.id)
        )
    )`;

    const subCategoryCountSql = `(
      SELECT COUNT(*)::int
      FROM product_categories AS sub
      WHERE sub.deleted_at IS NULL
        AND sub.parent_id = product_categories.id
    )`;

    let qb = ProductCategoriesModel.query()
      .modify('childrens')
      .select([
        'product_categories.*',
        ProductCategoriesModel.relatedQuery('products')
          .whereNull('products.deleted_at')
          .count()
          .as('total_product'),
        raw(`${productCountSql} as total_product_all`),
        raw(`${subCategoryCountSql} as sub_category_count`),
      ])
      .where((builder) => {
        if (query.q) {
          const keyword = `%${query.q}%`;
          builder.where((searchBuilder) => {
            searchBuilder
              .whereILike('name', keyword)
              .orWhereILike('description', keyword)
              .orWhereExists(
                ProductCategoriesModel.query()
                  .from('product_categories as sub_search')
                  .whereRaw('sub_search.parent_id = product_categories.id')
                  .whereNull('sub_search.deleted_at')
                  .whereILike('sub_search.name', keyword),
              );
          });
        }
      })
      .where((builder) => {
        builder.where('company_id', auth.company_id).orWhereNull('company_id');
      })
      .whereNull('deleted_at');

    if (query.is_active === 'true') {
      qb = qb.where('is_active', true);
    } else if (query.is_active === 'false') {
      qb = qb.where('is_active', false);
    }

    if (query.productFilter === 'has') {
      qb = qb.whereRaw(`${productCountSql} > 0`);
    } else if (query.productFilter === 'empty') {
      qb = qb.whereRaw(`${productCountSql} = 0`);
    }

    if (query.subCategoryFilter === 'has') {
      qb = qb.whereRaw(`${subCategoryCountSql} > 0`);
    } else if (query.subCategoryFilter === 'empty') {
      qb = qb.whereRaw(`${subCategoryCountSql} = 0`);
    }

    if (sortBy === 'total_product') {
      qb = qb.orderByRaw(`${productCountSql} ${sortOrder}`);
    } else if (allowedSortColumns.includes(sortBy)) {
      qb = qb.orderBy(sortBy, sortOrder);
    } else {
      qb = qb.orderBy('created_at', 'desc');
    }

    return qb;
  }

  async detail(id: number, auth: IAuth) {
    const cat = await ProductCategoriesModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!cat) throw new NotFoundException();

    return cat;
  }

  private buildSlug(name: string) {
    return slugify(name.trim(), { lower: true, strict: true });
  }

  private async slugExists(
    slug: string,
    options?: SlugOptions,
  ): Promise<boolean> {
    if (options?.reservedSlugs?.has(slug)) {
      return true;
    }

    let query = ProductCategoriesModel.query(options?.trx).where('slug', slug);

    if (options?.excludeId) {
      query = query.whereNot('id', options.excludeId);
    }

    const existing = await query.first();

    return Boolean(existing);
  }

  async slug(name: string, options?: SlugOptions): Promise<string> {
    const baseSlug = this.buildSlug(name);
    let candidate = baseSlug;
    let counter = 1;

    while (await this.slugExists(candidate, options)) {
      candidate = `${baseSlug}-${counter}`;
      counter += 1;
    }

    return candidate;
  }

  private async buildSubCategories(
    subCategories: CreateCategoryDto['subCategories'],
    trx: Transaction,
    reservedSlugs: Set<string>,
  ) {
    const result: Array<{
      id?: number;
      name: string;
      slug: string;
    }> = [];

    for (const item of subCategories || []) {
      const nextSlug = await this.slug(item.name, {
        excludeId: item.id,
        trx,
        reservedSlugs,
      });

      reservedSlugs.add(nextSlug);

      result.push({
        ...item,
        slug: nextSlug,
      });
    }

    return result;
  }

  async create(body: CreateCategoryDto, auth: IAuth) {
    return await ProductCategoriesModel.transaction(async (trx) => {
      const reservedSlugs = new Set<string>();
      const subCategories = await this.buildSubCategories(
        body.subCategories,
        trx,
        reservedSlugs,
      );

      const payload = {
        ...body,
        slug: await this.slug(body.name, {
          excludeId: body.id,
          trx,
          reservedSlugs,
        }),
        company_id: auth.company_id,
        updated_by: auth.id,
      };

      delete payload.subCategories;

      if (body.id) {
        const category = await ProductCategoriesModel.query(trx).findById(
          body.id,
        );

        if (!category) throw new NotFoundException();

        await category.$query(trx).patch({
          name: payload.name,
          description: payload.description,
          is_active: payload.is_active,
          slug: payload.slug,
          company_id: payload.company_id,
          updated_by: payload.updated_by,
        });

        const ids: number[] = [];

        for (const cat of subCategories || []) {
          if (cat?.id) {
            ids.push(cat.id);
            const { id, ...updatePayload } = cat;

            await ProductCategoriesModel.query(trx).updateAndFetchById(id, {
              ...updatePayload,
              parent_id: category.id,
            });
          } else {
            const dt = await ProductCategoriesModel.query(trx).insert({
              ...cat,
              parent_id: category.id,
            });

            ids.push(dt.id);
          }
        }

        if (ids.length > 0) {
          const { count: productCount }: any = await ProductsModel.query(trx)
            .leftJoinRelated('category')
            .whereNotIn('category_id', ids)
            .whereNull('products.deleted_at')
            .whereNull('category.deleted_at')
            .where('category.parent_id', category.id)
            .count()
            .first();

          console.log(productCount, ids, 'productCount');

          if (productCount > 0) {
            throw new BadRequestException(
              'Kategori ini tidak dapat dihapus karena masih memiliki produk yang terkait',
            );
          }

          await ProductCategoriesModel.query(trx)
            .whereNotIn('id', ids)
            .where('parent_id', category.id)
            .update({
              deleted_at: fn.now(),
              updated_by: auth.id,
              slug: raw("CONCAT(slug, '_delete_', id)"),
            });
        }

        return await ProductCategoriesModel.query(trx)
          .withGraphFetched('children')
          .findById(body.id);
      } else {
        return await ProductCategoriesModel.query(trx).insertGraphAndFetch({
          ...payload,
          children: subCategories,
        } as any);
      }
    });
  }

  async destroy(id: number, auth: IAuth) {
    const category = await ProductCategoriesModel.query()
      .withGraphFetched('children')
      .whereNull('deleted_at')
      .where('id', id)
      .first();

    if (!category) throw new NotFoundException();

    const childIds = category.children.map((e) => e.id);

    if (childIds.length > 0) {
      const { count: productCount }: any = await ProductsModel.query()
        .whereIn('category_id', childIds)
        .whereNull('deleted_at')
        .count()
        .first();

      if (productCount > 0) {
        throw new BadRequestException(
          'Kategori ini tidak dapat dihapus karena masih memiliki produk yang terkait',
        );
      }
    }

    const payload = {
      deleted_at: fn.now(),
      updated_by: auth.id,
    };

    await category.$query().patch({
      ...payload,
      slug: raw("CONCAT(slug, '_delete_', id)"),
    });

    await ProductCategoriesModel.query()
      .whereIn('id', childIds)
      .update({
        ...payload,
        slug: raw("CONCAT(slug, '_delete_', id)"),
      });
  }
  async bulkProductCategoryUpdate(body: BulkCategoryUpdateDto, auth: IAuth) {
    await ProductsModel.query()
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (body.productIds !== 'all') {
          builder.whereIn('id', body.productIds);
        }
      })
      .update({
        category_id: body.categoryId,
        updated_by: auth.id,
      });
  }
}
