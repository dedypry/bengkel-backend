import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('work_orders')
export class WorkOrdersModel extends BaseModel {
  // === FIELD START ===
  trx_no?: string;
  queue_no?: string;
  current_km?: number;
  priority?: string;
  status?: string;
  company_id?: number;
  customer_id?: number;
  vehicle_id?: number;
  supervisor_id?: number;
  mechanic_id?: number;
  updated_by?: number;
  // === FIELD END ===
}