import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('goods_receipts')
export class GoodsReceiptsModel extends BaseModel {
  // === FIELD START ===
  grn_number?: string;
  po_number?: string;
  supplier_id?: number;
  received_id?: number;
  receipt_at?: string;
  verify_id?: number;
  verify_at?: string;
  delivery_note_no?: string;
  expedition?: string;
  driver_name?: string;
  license_plate?: string;
  notes?: string;
  company_id?: number;
  // === FIELD END ===
}