import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { OrderItemsModel } from './order-items.model';
import { CustomersModel } from './customers.model';

@Table('orders')
export class OrdersModel extends BaseModel {
  // === FIELD START ===
  trx_no?: string;
  ppn?: number;
  grand_total?: number;
  company_id?: number;
  updated_id?: number;
  customer_id?: number;
  po_no?: string;
  other_fee?: number;
  subtotal?: number;
  tax?: number;
  discount?: number;
  signature_id?: number;
  notes?: string;
  dic_percentage?: number;
  // === FIELD END ===

  @HasMany(() => OrderItemsModel, {
    to: 'order_id',
  })
  items?: OrderItemsModel[];

  @BelongsToOne(() => CustomersModel, {
    from: 'customer_id',
  })
  customer: CustomersModel;
}
