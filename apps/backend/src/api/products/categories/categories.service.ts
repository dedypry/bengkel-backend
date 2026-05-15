import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductCategoriesModel } from 'models/product-categories.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CategoryQueryDto, CreateCategoryDto } from './dto/categories.dto';
import slugify from 'slugify';
import { fn, raw } from 'objection';
import { ProductsModel } from 'models/products.model';

@Injectable()
export class CategoriesService {
  async list(query: CategoryQueryDto, auth: IAuth) {
    return await ProductCategoriesModel.query()
      .modify('childrens')
      .select([
        'product_categories.*',
        ProductCategoriesModel.relatedQuery('products')
          .count()
          .as('total_product'),
      ])
      .where((builder) => {
        if (query.q) {
          builder.whereILike('name', `%${query.q}%`);
        }
      })
      .where((builder) => {
        builder.where('company_id', auth.company_id).orWhereNull('company_id');
      })
      .whereNull('deleted_at')
      .orderBy('id', 'desc');
  }

  async detail(id: number, auth: IAuth) {
    const cat = await ProductCategoriesModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!cat) throw new NotFoundException();

    return cat;
  }

  async slug(name: string, counter: number = 0): Promise<string> {
    const suffix = counter > 0 ? `-${counter}` : '';
    const sl = slugify(name + suffix, { lower: true, strict: true });
    const findSlug = await ProductCategoriesModel.query()
      .where('slug', sl)
      .first();

    if (!findSlug) return sl;

    return await this.slug(name, counter + 1);
  }

  async create(body: CreateCategoryDto, auth: IAuth) {
    const subCategories = await Promise.all(
      (body.subCategories || []).map(async (e) => ({
        ...e,
        slug: await this.slug(e.name),
      })),
    );

    const payload = {
      ...body,
      slug: await this.slug(body.name),
      company_id: auth.company_id,
      updated_by: auth.id,
    };

    delete payload.subCategories;

    return await ProductCategoriesModel.transaction(async (trx) => {
      if (body.id) {
        const category = await ProductCategoriesModel.query(trx).findById(
          body.id,
        );

        if (!category) throw new NotFoundException();

        await category.$query(trx).patch(payload);

        const ids: number[] = [];

        for (const cat of subCategories || []) {
          if (cat?.id) {
            ids.push(cat.id);
            await ProductCategoriesModel.query(trx).updateAndFetchById(cat.id, {
              ...cat,
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

        await ProductCategoriesModel.query(trx)
          .whereNotIn('id', ids)
          .where('parent_id', category.id)
          .update({
            deleted_at: fn.now(),
            updated_by: auth.id,
            slug: raw("CONCAT(slug, '_delete_', id)"),
          });

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
}
