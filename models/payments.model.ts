import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { OrdersModel } from './orders.model';
import { WorkOrdersModel } from './work-orders.model';
import { UsersModel } from './users.model';
import { CompaniesModel } from './companies.model';

@Table('payments')
export class PaymentsModel extends BaseModel {
  // === FIELD START ===
  payment_no!: string;
  amount!: number;
  method?: string;
  payment_date?: string;
  reference_no?: string;
  bank_name?: string;
  proof_image?: string;
  updated_by?: number;
  work_order_id?: number;
  received_amount?: number;
  order_id?: number;
  company_id?: number;
  type?: string;
  // === FIELD END ===

  @BelongsToOne(() => UsersModel, {
    from: 'updated_by',
  })
  cashier?: UsersModel;

  @BelongsToOne(() => OrdersModel, {
    from: 'order_id',
  })
  order?: OrdersModel;

  @BelongsToOne(() => WorkOrdersModel, {
    from: 'work_order_id',
  })
  work_order?: WorkOrdersModel;

  @BelongsToOne(() => CompaniesModel, {
    from: 'company_id',
  })
  company?: CompaniesModel;
}
