import { HasOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { AddressModel } from './address.model';

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
  // === FIELD END ===

  @HasOne(() => AddressModel, {
    to: 'parent_id',
    filter: (query) => query.where('model', 'company'),
  })
  address?: AddressModel;
}
