import { HasMany, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProductsModel } from './products.model';

@Table('product_categories', { softDelete: true, hide: ['company_id'] })
export class ProductCategoriesModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  company_id?: number;
  description?: string;
  is_active?: boolean;
  updated_by?: number;
  // === FIELD END ===

  @HasMany(() => ProductsModel, {
    to: 'category_id',
  })
  products?: ProductsModel;
}
