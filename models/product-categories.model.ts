import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProductsModel } from './products.model';
import slugify from 'slugify';

@Table('product_categories', { softDelete: true, hide: ['company_id'] })
export class ProductCategoriesModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  company_id?: number;
  description?: string;
  is_active?: boolean;
  updated_by?: number;
  parent_id?: number;
  // === FIELD END ===

  static async findOrCreate(
    name: string,
    parent?: string,
    company_id?: number,
  ) {
    let category = await this.query()
      .where({ company_id })
      .whereRaw('LOWER(name) = ?', [name.toLowerCase()])
      .first();

    if (!category) {
      try {
        let parentId: number | null = null;

        if (parent) {
          const parentCategory = await this.findOrCreate(parent.trim());
          parentId = parentCategory?.id;
        }

        category = await this.query().insertAndFetch({
          name,
          slug: slugify(name, { lower: true, strict: true }),
          parent_id: parentId,
          company_id,
        } as any);
      } catch (err) {
        console.error(err);
        // Jika ada proses paralel yang insert di waktu yang sama
        category = await this.query()
          .where({ company_id })
          .whereRaw('LOWER(name) = ?', [name.toLowerCase()])
          .first();
      }
    }

    return category;
  }

  @HasMany(() => ProductsModel, {
    to: 'category_id',
  })
  products?: ProductsModel;

  @BelongsToOne(() => ProductCategoriesModel, {
    from: 'parent_id',
  })
  parent?: ProductCategoriesModel;
}
