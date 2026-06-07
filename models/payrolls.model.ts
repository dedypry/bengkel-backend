import { HasMany, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { PayrollItemsModel } from './payroll-items.model';

@Table('payrolls', { softDelete: true })
export class PayrollsModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  code!: string;
  period_type!: string;
  period_start!: string;
  period_end!: string;
  status?: string;
  total_amount?: number;
  note?: string;
  paid_at?: string;
  created_by?: number;
  updated_by?: number;
  // === FIELD END ===

  @HasMany(() => PayrollItemsModel, {
    to: 'payroll_id',
  })
  items?: PayrollItemsModel[];
}
