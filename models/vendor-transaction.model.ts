import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('vendor_transaction')
export class VendorTransactionModel extends BaseModel {
  // === FIELD START ===
  purchase_no?: string;
  invoice_no?: string;
  payment_type?: string;
  payment_method?: string;
  due_days?: number;
  due_date?: string;
  signature_id?: number;
  tax?: number;
  discount?: number;
  other_fees?: number;
  subtotal?: number;
  total?: number;
  status?: string;
  company_id?: number;
  // === FIELD END ===
}