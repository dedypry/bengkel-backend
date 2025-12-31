import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

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
  // === FIELD END ===
}
