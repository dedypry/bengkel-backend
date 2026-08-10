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
import { CompaniesModel } from './companies.model';
import { resolveWorkOrderCreatedAt } from 'utils/helpers/dayjs';

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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
  complaints?: string;
  next_sugestion?: string;
  booking_id?: number;
  next_km?: number;
  pic_id?: number;
  sa_id?: number;
  other_fee?: number;
  disc_percentage?: number;
  disc_value?: number;
  cancel_note?: string;
  remind_next_service?: boolean;
  next_service_due_date?: string | null;
  next_service_reminder_sent_at?: string | null;
  // === FIELD END ===

  $beforeInsert() {
    const now = new Date().toISOString();

    if (
      !this.created_at ||
      (typeof this.created_at === 'string' &&
        DATE_ONLY_PATTERN.test(this.created_at))
    ) {
      this.created_at = resolveWorkOrderCreatedAt(this.created_at);
    }

    this.updated_at = now;
  }

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

  @BelongsToOne(() => UsersModel, {
    from: 'sa_id',
  })
  sa?: UsersModel;

  @BelongsToOne(() => UsersModel, {
    from: 'pic_id',
  })
  pic?: UsersModel;

  @HasOne(() => PaymentsModel, {
    to: 'work_order_id',
  })
  payment?: PaymentsModel;

  @BelongsToOne(() => CompaniesModel, {
    from: 'company_id',
  })
  company?: CompaniesModel;
}
