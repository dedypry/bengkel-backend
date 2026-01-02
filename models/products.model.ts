import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProductCategoriesModel } from './product-categories.model';
import { UomsModel } from './uoms.model';
import { ImagesModel } from './images.model';

@Table('products')
export class ProductsModel extends BaseModel {
  // === FIELD START ===
  code: string;
  company_id?: number;
  name: string;
  image?: string;
  description?: string;
  category_id?: number;
  supplier_id?: number;
  purchase_price?: number;
  sell_price?: number;
  stock?: number;
  min_stock?: number;
  unit?: string;
  location?: string;
  is_active?: boolean;
  updated_by?: number;
  slug?: string;
  uom_id?: number;
  // === FIELD END ===

  @BelongsToOne(() => ProductCategoriesModel, {
    from: 'category_id',
  })
  category?: ProductCategoriesModel;

  @BelongsToOne(() => UomsModel, {
    from: 'uom_id',
  })
  uom?: UomsModel;

  @HasMany(() => ImagesModel, {
    to: 'parent_id',
    filter: (query) => query.where('model', 'products'),
  })
  images?: ImagesModel;
}
