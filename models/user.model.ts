import {
  HasOne,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { CompanyModel } from './company.model';
import { ProfileModel } from './profile.model';

@Table('users')
export class UserModel extends BaseModel {
  nik?: string | null;
  name: string;
  email: string;
  password?: string;
  phone_number?: string | null;
  position?: string;
  join_date?: string;
  is_active?: boolean;

  @ManyToMany(() => CompanyModel, {
    table: 'company_user',
    from: 'user_id',
    to: 'company_id',
  })
  companies?: CompanyModel[];

  @HasOne(() => ProfileModel, {
    to: 'user_id',
  })
  profile?: ProfileModel;
}
