import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { ProvinceModel } from './province.model';
import { CityModel } from './city.model';
import { DistrictModel } from './district.model';

@Table('address', { hide: ['model', 'parent_id'] })
export class AddressModel extends BaseModel {
  // === FIELD START ===
  parent_id: number;
  model: string;
  title?: string;
  zip_code?: string;
  updated_by?: number;
  province_id?: number;
  city_id?: number;
  district_id?: number;
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
