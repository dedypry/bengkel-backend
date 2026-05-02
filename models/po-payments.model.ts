import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('po_payments')
export class PoPaymentsModel extends BaseModel {
  // === FIELD START ===
  po_id?: number;
  date?: string;
  amount?: number;
  notes?: string;
  signature_id?: number;
  // === FIELD END ===
}