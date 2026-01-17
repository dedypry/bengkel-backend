import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { GoodsReceiptItemsModel } from './goods-receipt-items.model';
import { SuppliersModel } from './suppliers.model';
import { UsersModel } from './users.model';

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

  @HasMany(() => GoodsReceiptItemsModel, {
    to: 'goods_receipt_id',
  })
  items: GoodsReceiptItemsModel[];

  @BelongsToOne(() => SuppliersModel, {
    from: 'supplier_id',
  })
  supplier: SuppliersModel;

  @BelongsToOne(() => UsersModel, {
    from: 'received_id',
  })
  received: UsersModel;
}
