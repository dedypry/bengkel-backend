import {
  HasOne,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { UsersModel } from './users.model';

@Table('companies', { hide: ['created_at', 'updated_at'] })
export class CompaniesModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  logo_url?: string;
  email?: string;
  phone_number?: string;
  fax?: string;
  npwp?: string;
  updated_by?: number;
  is_ppn?: boolean;
  ppn?: number;
  is_discount_birth_day?: boolean;
  total_discount_birth_day?: number;
  max_discount_birth_day?: number;
  type_discount_birth_day?: string;
  // === FIELD END ===

  @HasOne(() => AddressModel, {
    to: 'parent_id',
    filter: (query) => query.where('model', 'companies'),
  })
  address?: AddressModel;

  @ManyToMany(() => UsersModel, {
    table: 'company_user',
    to: 'user_id',
    from: 'company_id',
  })
  users?: UsersModel;
}
