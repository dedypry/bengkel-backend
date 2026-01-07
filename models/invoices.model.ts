import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('invoices')
export class InvoicesModel extends BaseModel {
  // === FIELD START ===
  invoice_no: string;
  work_order_id: number;
  subtotal?: number;
  discount?: number;
  tax_amount?: number;
  grand_total?: number;
  status?: string;
  notes?: string;
  promo_data?: any;
  promo_amount?: number;
  company_id?: number;
  updated_by?: number;
  // === FIELD END ===
}