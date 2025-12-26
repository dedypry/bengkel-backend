import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('company_user')
export class CompanyUserModel extends BaseModel {
  // === FIELD START ===
  user_id?: number;
  company_id?: number;
  // === FIELD END ===
}
