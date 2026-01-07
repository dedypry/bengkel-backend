import { Injectable } from '@nestjs/common';
import { Row } from 'exceljs';
import { CityModel } from 'models/city.model';
import { ProvinceModel } from 'models/province.model';
import { getRow } from 'utils/helpers/global';
import { IAuth } from 'utils/interfaces/IAuth';
import { supplierData } from './data';
import { SuppliersModel } from 'models/suppliers.model';

@Injectable()
export class SuppliersService {
  async createAuto(auth: IAuth) {
    for (const item of supplierData) {
      let province = null as any;
      let city = null as any;
      if (item['PROVINSI']) {
        province = await ProvinceModel.query()
          .whereILike('name', item['PROVINSI'])
          .first();
      }
      if (item['KOTA']) {
        city = await CityModel.query().whereILike('name', item['KOTA']).first();
      }

      const payload = {
        code: item['KODE'],
        name: item['NAMA'],
        address: item['ALAMAT'],
        company_id: auth.company_id,
        zipcode: item['KODE POS'],
        phone: (item['NO. HP'] || item['NO. TELEPON'])?.replaceAll("'", ''),
        fax_number: item['NO. FAKS'],
        email: item['EMAIL'],
        website: item['WEBSITE'],
        province_id: province?.id,
        city_id: city?.id,
      };

      const supplier = await SuppliersModel.query().findOne(
        'code',
        payload.code,
      );

      await SuppliersModel.query().upsertGraph({
        ...(supplier && {
          id: supplier.id,
        }),
        ...payload,
      });
    }
  }
  async createFromImport(row: Row, auth: IAuth) {
    let province = null as any;
    let city = null as any;

    if (getRow(row, 'E')) {
      province = await ProvinceModel.query()
        .whereILike('name', getRow(row, 'E'))
        .first();
    }
    if (getRow(row, 'D')) {
      city = await CityModel.query()
        .whereILike('name', getRow(row, 'D'))
        .first();
    }
    const payload = {
      code: getRow(row, 'A'),
      name: getRow(row, 'B'),
      address: getRow(row, 'C'),
      company_id: auth.company_id,
      zipcode: getRow(row, 'F'),
      phone: getRow(row, 'G') || getRow(row, 'I'),
      fax_number: getRow(row, 'H'),
      email: getRow(row, 'J'),
      website: getRow(row, 'K'),
      province_id: province?.id,
      city_id: city?.id,
    };

    console.log('PAYLOAD', payload);
    return payload;
  }
}
