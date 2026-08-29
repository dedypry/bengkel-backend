import {
  BelongsToOne,
  HasMany,
  Modifier,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProductsModel } from './products.model';
import slugify from 'slugify';
import type { AnyQueryBuilder } from 'objection';

@Table('product_categories', { hide: ['company_id'] })
export class ProductCategoriesModel extends BaseModel {
  // === FIELD START ===
  name!: string;
  slug!: string;
  company_id?: number;
  description?: string;
  is_active?: boolean;
  updated_by?: number;
  parent_id?: number;
  // === FIELD END ===

  private static buildSlug(
    name: string,
    parent?: ProductCategoriesModel | null,
  ): string {
    const base = slugify(name.trim(), { lower: true, strict: true });
    if (parent?.slug) {
      return `${parent.slug}-${base}`;
    }
    return base;
  }

  static async findOrCreate(
    name: string,
    parent?: string,
    company_id?: number,
  ) {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    let parentId: number | null = null;
    let parentCategory: ProductCategoriesModel | null = null;

    if (parent && parent.trim() !== '') {
      parentCategory = await this.findOrCreate(
        parent.trim(),
        undefined,
        company_id,
      );
      parentId = parentCategory?.id ?? null;
    }

    const slug = this.buildSlug(trimmedName, parentCategory);

    let category = await this.query()
      .where({ company_id })
      .whereNull('deleted_at')
      .modify((qb) => {
        if (parentId === null) {
          qb.whereNull('parent_id');
        } else {
          qb.where('parent_id', parentId);
        }
      })
      .andWhere((q) => {
        q.whereRaw('LOWER(name) = ?', [trimmedName.toLowerCase()]).orWhere(
          'slug',
          slug,
        );
      })
      .first();

    if (!category) {
      try {
        category = await this.query()
          .insertAndFetch({
            name: trimmedName,
            slug,
            parent_id: parentId,
            company_id,
          } as any)
          .onConflict('slug')
          .ignore();

        if (!category) {
          category = await this.query()
            .where({ company_id, slug })
            .whereNull('deleted_at')
            .first();
        }
      } catch (err) {
        console.error(err);
        category = await this.query()
          .where({ company_id })
          .whereNull('deleted_at')
          .modify((qb) => {
            if (parentId === null) {
              qb.whereNull('parent_id');
            } else {
              qb.where('parent_id', parentId);
            }
          })
          .andWhere((q) => {
            q.whereRaw('LOWER(name) = ?', [trimmedName.toLowerCase()]).orWhere(
              'slug',
              slug,
            );
          })
          .first();
      }
    }

    return category;
  }

  @Modifier()
  childrens(query: AnyQueryBuilder) {
    query
      .withGraphFetched('children(deleted)')
      .whereNull('parent_id')
      .modifiers({
        deleted: (query: AnyQueryBuilder) => {
          query
            .whereNull('deleted_at')
            .select([
              'product_categories.*',
              ProductCategoriesModel.relatedQuery('products')
                .whereNull('products.deleted_at')
                .count()
                .as('total_product'),
            ])
            .orderBy('name', 'asc');
        },
      });
  }

  @HasMany(() => ProductsModel, {
    to: 'category_id',
  })
  products?: ProductsModel;

  @BelongsToOne(() => ProductCategoriesModel, {
    from: 'parent_id',
  })
  parent?: ProductCategoriesModel;

  @HasMany(() => ProductCategoriesModel, {
    from: 'id',
    to: 'parent_id',
  })
  children?: ProductCategoriesModel[];
}
