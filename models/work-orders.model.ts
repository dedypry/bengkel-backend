import {
  BelongsToOne,
  HasMany,
  HasOne,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';
import { CustomersModel } from './customers.model';
import { VehiclesModel } from './vehicles.model';
import { WorkOrderItemsModel } from './work-order-items.model';
import { PaymentsModel } from './payments.model';

@Table('work_orders')
export class WorkOrdersModel extends BaseModel {
  // === FIELD START ===
  trx_no?: string;
  queue_no?: string;
  current_km?: number;
  priority?: string;
  status?: string;
  company_id?: number;
  customer_id?: number;
  vehicle_id?: number;
  supervisor_id?: number;
  mechanic_id?: number;
  updated_by?: number;
  sparepart_total?: number;
  service_total?: number;
  sub_total?: number;
  grand_total?: number;
  ppn_percent?: number;
  ppn_amount?: number;
  progress?: string;
  discount_amount?: number;
  start_at?: string;
  end_at?: string;
  promo_data?: any;
  promo_amount?: number;
  // === FIELD END ===

  @HasMany(() => WorkOrderItemsModel, {
    to: 'work_order_id',
  })
  items?: WorkOrderItemsModel[];

  @HasMany(() => WorkOrderItemsModel, {
    filter: (query) => query.where('type', 'service'),
    to: 'work_order_id',
  })
  services?: WorkOrderItemsModel[];

  @HasMany(() => WorkOrderItemsModel, {
    filter: (query) => query.where('type', 'sparepart'),
    to: 'work_order_id',
  })
  spareparts?: WorkOrderItemsModel[];

  @BelongsToOne(() => VehiclesModel, {
    from: 'vehicle_id',
  })
  vehicle?: VehiclesModel;

  @BelongsToOne(() => CustomersModel, {
    from: 'customer_id',
  })
  customer?: CustomersModel;

  @BelongsToOne(() => UsersModel, {
    from: 'mechanic_id',
  })
  mechanic?: UsersModel;

  @ManyToMany(() => UsersModel, {
    from: 'work_order_id',
    to: 'mechanic_id',
    table: 'mechanic_work',
  })
  mechanics?: UsersModel[];

  @BelongsToOne(() => UsersModel, {
    from: 'updated_by',
  })
  updated?: UsersModel;

  @HasOne(() => PaymentsModel, {
    to: 'work_order_id',
  })
  payment?: PaymentsModel;
}
