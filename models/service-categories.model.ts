import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('service_categories', {
  hide: ['created_at', 'updated_at', 'deleted_at', 'company_id'],
})
export class ServiceCategoriesModel extends BaseModel {
  // === FIELD START ===
  company_id: number;
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
  // === FIELD END ===
}
