import { ManyToMany, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { PermissionsModel } from './permissions.model';

@Table('roles', { hide: ['created_at', 'updated_at'], softDelete: true })
export class RolesModel extends BaseModel {
  // === FIELD START ===
  name!: string;
  slug!: string;
  description?: string;
  updated_by?: number;
  company_id?: number;
  // === FIELD END ===

  @ManyToMany(() => PermissionsModel, {
    table: 'role_permissions',
    from: 'role_id',
    to: 'permission_id',
  })
  permissions: PermissionsModel[];
}
