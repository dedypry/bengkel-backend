import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('role_user')
export class RoleUserModel extends BaseModel {
  // === FIELD START ===
  user_id?: number;
  role_id?: number;
  // === FIELD END ===
}
