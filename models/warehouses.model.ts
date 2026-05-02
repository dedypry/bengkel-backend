import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProvinceModel } from './province.model';
import { CityModel } from './city.model';
import { DistrictModel } from './district.model';

@Table('warehouses')
export class WarehousesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  code!: string;
  name!: string;
  description?: string;
  address?: string;
  phone_number?: string;
  email?: string;
  fax?: string;
  npwp?: string;
  province_id?: number;
  city_id?: number;
  district_id?: number;
  zipcode?: string;
  logo_url?: string;
  contact_name?: string;
  contact_phone?: string;
  is_active?: boolean;
  created_id?: number;
  updated_id?: number;
  // === FIELD END ===

  @BelongsToOne(() => ProvinceModel, {
    from: 'province_id',
  })
  province: ProvinceModel;

  @BelongsToOne(() => CityModel, {
    from: 'city_id',
  })
  city: CityModel;

  @BelongsToOne(() => DistrictModel, {
    from: 'district_id',
  })
  district: DistrictModel;
}
