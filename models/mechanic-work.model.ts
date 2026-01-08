import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('mechanic-work')
export class MechanicWorkModel extends BaseModel {
  // === FIELD START ===
  work_order_id?: number;
  mechanic_id?: number;
  status?: string;
  // === FIELD END ===
}