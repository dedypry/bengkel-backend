import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('product_categories')
export class ProductCategoriesModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  company_id?: number;
  description?: string;
  is_active?: boolean;
  updated_by?: number;
  // === FIELD END ===
}
