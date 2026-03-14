import {
  BelongsToOne,
  HasMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { WorkOrderItemsModel } from './work-order-items.model';
import { SuppliersModel } from './suppliers.model';

@Table('vendor_transaction')
export class VendorTransactionModel extends BaseModel {
  // === FIELD START ===
  purchase_no?: string;
  invoice_no?: string;
  payment_type?: string;
  payment_method?: string;
  due_days?: number;
  due_date?: string;
  signature_id?: number;
  tax?: number;
  discount?: number;
  other_fees?: number;
  subtotal?: number;
  total?: number;
  status?: string;
  company_id?: number;
  supplier_id?: number;
  // === FIELD END ===

  @HasMany(() => WorkOrderItemsModel, {
    to: 'vendor_transaction_id',
  })
  items: WorkOrderItemsModel[];

  @BelongsToOne(() => SuppliersModel, {
    from: 'supplier_id',
  })
  supplier: SuppliersModel;
}
