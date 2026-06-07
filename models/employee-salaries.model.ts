import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';

@Table('employee_salaries', { softDelete: true })
export class EmployeeSalariesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  user_id!: number;
  salary_type?: string;
  base_salary?: number;
  allowance?: number;
  deduction?: number;
  note?: string;
  is_active?: boolean;
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => UsersModel, {
    from: 'user_id',
  })
  user?: UsersModel;
}
