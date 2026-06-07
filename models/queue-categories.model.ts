import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('ms_queue_categories', { softDelete: true })
export class QueueCategoriesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  code!: string;
  name!: string;
  prefix_code!: string;
  current_number!: number;
  last_reset_date?: string;
  estimated_minutes?: number;
  is_active?: boolean;
  sort_order?: number;
  updated_by?: number;
  // === FIELD END ===
}
