import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('goods_receipt_items')
export class GoodsReceiptItemsModel extends BaseModel {
  // === FIELD START ===
  goods_receipt_id?: number;
  product_id?: number;
  condition?: string;
  qty_po?: number;
  qty_receipt?: number;
  purchase_price?: number;
  // === FIELD END ===
}