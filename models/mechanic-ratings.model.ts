import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('mechanic_ratings')
export class MechanicRatingsModel extends BaseModel {
  // === FIELD START ===
  work_order_id?: number;
  mechanic_id?: number;
  supervisor_id?: number;
  customer_id?: number;
  rating: number;
  notes?: string;
  company_id?: number;
  // === FIELD END ===
}