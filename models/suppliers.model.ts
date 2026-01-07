import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('suppliers')
export class SuppliersModel extends BaseModel {
  // === FIELD START ===
  code: string;
  company_id?: number;
  name: string;
  contact_name?: string;
  phone: string;
  email?: string;
  address?: string;
  npwp?: string;
  is_active?: boolean;
  updated_by?: number;
  province_id?: number;
  city_id?: number;
  district_id?: number;
  zipcode?: string;
  fax_number?: string;
  website?: string;
  // === FIELD END ===
}
