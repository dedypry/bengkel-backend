import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('payments')
export class PaymentsModel extends BaseModel {
  // === FIELD START ===
  payment_no: string;
  amount: number;
  method?: string;
  payment_date?: string;
  reference_no?: string;
  bank_name?: string;
  proof_image?: string;
  updated_by?: number;
  work_order_id?: number;
  received_amount?: number;
  // === FIELD END ===
}
