import { HasOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { AddressModel } from './address.model';

@Table('companies', { hide: ['created_at', 'updated_at'] })
export class CompanyModel extends BaseModel {
  name: string;
  slug: string;
  logo_url?: string | null;
  email?: string | null;
  phone_number?: string | null;
  fax?: string | null;
  npwp?: string | null;

  @HasOne(() => AddressModel, {
    to: 'parent_id',
    filter: (query) => query.where('model', 'company'),
  })
  address?: AddressModel;
}
