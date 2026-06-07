import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { QueueCategoriesModel } from './queue-categories.model';
import { UsersModel } from './users.model';
import { WorkOrdersModel } from './work-orders.model';

@Table('tr_queues')
export class QueuesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  queue_number!: string;
  category_id!: number;
  queue_date!: string;
  sequence!: number;
  status!: string;
  counter_number?: string;
  attendant_id?: number;
  work_order_id?: number;
  called_at?: string;
  started_at?: string;
  done_at?: string;
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => QueueCategoriesModel, {
    from: 'category_id',
  })
  category?: QueueCategoriesModel;

  @BelongsToOne(() => UsersModel, {
    from: 'attendant_id',
  })
  attendant?: UsersModel;

  @BelongsToOne(() => WorkOrdersModel, {
    from: 'work_order_id',
  })
  work_order?: WorkOrdersModel;
}
