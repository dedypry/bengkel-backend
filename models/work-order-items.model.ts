import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('work_order_items')
export class WorkOrderItemsModel extends BaseModel {
  // === FIELD START ===
  data?: any;
  qty?: number;
  price?: number;
  total_price?: number;
  priority?: string;
  status?: string;
  work_order_id?: number;
  updated_by?: number;
  // === FIELD END ===
}