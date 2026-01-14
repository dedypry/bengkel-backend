import { HasMany, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { OrderItemsModel } from './order-items.model';

@Table('orders')
export class OrdersModel extends BaseModel {
  // === FIELD START ===
  trx_no?: string;
  ppn?: number;
  grand_total?: number;
  company_id?: number;
  updated_id?: number;
  // === FIELD END ===

  @HasMany(() => OrderItemsModel, {
    to: 'order_id',
  })
  items?: OrderItemsModel[];
}
