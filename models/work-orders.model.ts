import {
  BelongsToOne,
  HasMany,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';
import { CustomersModel } from './customers.model';
import { VehiclesModel } from './vehicles.model';
import { WorkOrderItemsModel } from './work-order-items.model';

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
  // === FIELD END ===

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
}
