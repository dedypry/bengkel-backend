import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('role_permissions')
export class RolePermissionsModel extends BaseModel {
  // === FIELD START ===
  role_id: number;
  permission_id: number;
  // === FIELD END ===
}