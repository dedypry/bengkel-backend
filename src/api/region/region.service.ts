import { Injectable } from '@nestjs/common';
import { CityModel } from 'models/city.model';
import { DistrictModel } from 'models/district.model';
import { ProvinceModel } from 'models/province.model';

@Injectable()
export class RegionService {
  async getProvince() {
    return await ProvinceModel.query();
  }

  async getCity(provinceId: number) {
    return await CityModel.query().where('province_id', provinceId);
  }

  async getDistrict(cityId: number) {
    return await DistrictModel.query().where('city_id', cityId);
  }
}
