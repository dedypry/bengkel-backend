import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';
import { PayrollsModel } from './payrolls.model';

@Table('payroll_items')
export class PayrollItemsModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  payroll_id!: number;
  user_id!: number;
  salary_type?: string;
  base_salary?: number;
  allowance?: number;
  overtime_amount?: number;
  bonus?: number;
  deduction?: number;
  gross?: number;
  net?: number;
  present_days?: number;
  absent_days?: number;
  late_count?: number;
  note?: string;
  status?: string;
  // === FIELD END ===

  @BelongsToOne(() => UsersModel, {
    from: 'user_id',
  })
  user?: UsersModel;

  @BelongsToOne(() => PayrollsModel, {
    from: 'payroll_id',
  })
  payroll?: PayrollsModel;
}
