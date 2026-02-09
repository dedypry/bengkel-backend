import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

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
}
