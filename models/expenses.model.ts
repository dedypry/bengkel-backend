import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ExpenseCategoriesModel } from './expense-categories.model';
import { UsersModel } from './users.model';

@Table('expenses')
export class ExpensesModel extends BaseModel {
  // === FIELD START ===
  expense_code!: string;
  title!: string;
  amount!: number;
  date!: string;
  notes?: string;
  status?: string;
  category_id!: number;
  company_id?: number;
  attachment_path?: string;
  supplier_id?: number;
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => ExpenseCategoriesModel, {
    from: 'category_id',
  })
  category?: ExpenseCategoriesModel;

  @BelongsToOne(() => UsersModel, {
    from: 'updated_by',
  })
  updated?: UsersModel;
}
