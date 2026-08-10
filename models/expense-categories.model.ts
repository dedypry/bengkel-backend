import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('expense_categories')
export class ExpenseCategoriesModel extends BaseModel {
  // === FIELD START ===
  name!: string;
  color?: string;
  company_id?: number;
  // === FIELD END ===
}
