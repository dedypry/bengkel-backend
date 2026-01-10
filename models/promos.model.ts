import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('promos')
export class PromosModel extends BaseModel {
  // === FIELD START ===
  code: string;
  name: string;
  type?: string;
  value?: number;
  max_discount?: number;
  min_purchase?: number;
  company_id?: number;
  start_date?: string;
  end_date?: string;
  quota?: number;
  used_count?: number;
  is_active?: boolean;
  description?: string;
  // === FIELD END ===
}
