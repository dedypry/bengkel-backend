import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('profiles')
export class ProfilesModel extends BaseModel {
  // === FIELD START ===
  user_id: number;
  full_name: string;
  phone_number?: string;
  address?: string;
  gender?: string;
  photo_url?: string;
  emergency_name?: string;
  emergency_contact?: string;
  join_date?: string;
  province_id?: number;
  city_id?: number;
  district_id?: number;
  birth_date?: string;
  place_birth?: string;
  // === FIELD END ===
}
