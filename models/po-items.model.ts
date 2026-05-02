import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProductsModel } from './products.model';

@Table('po_items')
export class PoItemsModel extends BaseModel {
  // === FIELD START ===
  po_id?: number;
  product_id?: number;
  qty?: number;
  price?: number;
  total?: number;
  disc_percentage?: number;
  disc_value?: number;
  ppn_percentage?: number;
  received_qty?: number;
  received_total?: number;
  // === FIELD END ===

  @BelongsToOne(() => ProductsModel, {
    from: 'product_id',
  })
  product: ProductsModel;
}
