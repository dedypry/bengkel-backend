import { Modifier, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { raw, type AnyQueryBuilder } from 'objection';

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
  // === FIELD END ===

  @Modifier()
  srBuild(query: AnyQueryBuilder) {
    query.select(
      raw(`data->>'name'`).as('name'),
      raw(`data->>'estimated_type'`).as('type'),
      raw(`(data->>'estimated_duration')::numeric`).as('estimated'),
    );
  }
}
