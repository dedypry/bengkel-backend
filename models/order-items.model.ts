import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { OrdersModel } from './orders.model';

@Table('order_items')
export class OrderItemsModel extends BaseModel {
  // === FIELD START ===
  order_id?: number;
  data?: any;
  product_id?: number;
  qty?: number;
  price?: number;
  total_price?: number;
  // === FIELD END ===

  @BelongsToOne(() => OrdersModel, {
    from: 'order_id',
  })
  order: OrdersModel;
}
