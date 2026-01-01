import {
  HasOne,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { CompaniesModel } from './companies.model';
import { ProfilesModel } from './profiles.model';
import { RolesModel } from './roles.model';

@Table('users', { softDelete: true })
export class UsersModel extends BaseModel {
  // === FIELD START ===
  nik?: string;
  name: string;
  email: string;
  password: string;
  position?: string;
  is_active?: boolean;
  type?: string;
  department?: string;
  status?: string;
  company_id?: number;
  updated_by?: number;
  work_status?: string;
  // === FIELD END ===

  @ManyToMany(() => CompaniesModel, {
    table: 'company_user',
    from: 'user_id',
    to: 'company_id',
  })
  companies?: CompaniesModel[];

  @ManyToMany(() => RolesModel, {
    table: 'role_user',
    from: 'user_id',
    to: 'role_id',
  })
  roles?: CompaniesModel[];

  @HasOne(() => ProfilesModel, {
    filter: (query) => query.where('model', 'users'),
    to: 'user_id',
  })
  profile?: ProfilesModel;
}
