import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProvinceModel } from './province.model';
import { CityModel } from './city.model';
import { DistrictModel } from './district.model';

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
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => ProvinceModel, {
    from: 'province_id',
  })
  province?: ProvinceModel;

  @BelongsToOne(() => CityModel, {
    from: 'city_id',
  })
  city?: CityModel;

  @BelongsToOne(() => DistrictModel, {
    from: 'district_id',
  })
  district?: DistrictModel;
}
