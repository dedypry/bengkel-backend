import {
  BelongsToOne,
  Modifier,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { raw, type AnyQueryBuilder } from 'objection';
import { WorkOrdersModel } from './work-orders.model';
import { SuppliersModel } from './suppliers.model';

@Table('work_order_items')
export class WorkOrderItemsModel extends BaseModel {
  // === FIELD START ===
  data?: any;
  qty?: number;
  price?: number;
  total_price?: number;
  priority?: string;
  status?: string;
  work_order_id?: number;
  updated_by?: number;
  type?: string;
  supplier_id?: number;
  purchase_price?: number;
  disc_percentage?: number;
  disc_value?: number;
  tax_percentage?: number;
  total_payment?: number;
  vendor_transaction_id?: number;
  // === FIELD END ===

  @Modifier()
  srBuild(query: AnyQueryBuilder) {
    query.select(
      raw(`data->>'name'`).as('name'),
      raw(`data->>'estimated_type'`).as('type'),
      raw(`(data->>'estimated_duration')::numeric`).as('estimated'),
    );
  }

  @BelongsToOne(() => WorkOrdersModel, {
    from: 'work_order_id',
  })
  work_order: WorkOrdersModel;

  @BelongsToOne(() => SuppliersModel, {
    from: 'supplier_id',
  })
  supplier: SuppliersModel;
}
