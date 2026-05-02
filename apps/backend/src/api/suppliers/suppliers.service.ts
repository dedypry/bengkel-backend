import { Injectable, NotFoundException } from '@nestjs/common';
import { Row } from 'exceljs';
import { CityModel } from 'models/city.model';
import { ProvinceModel } from 'models/province.model';
import { generateNo, getRow } from 'utils/helpers/global';
import { IAuth } from 'utils/interfaces/IAuth';
import { supplierData } from './data';
import { SuppliersModel } from 'models/suppliers.model';
import { IQuery } from 'utils/interfaces/query';
import { CreateSupplierDto } from './dto/suppliers.dto';
import { fn, raw } from 'objection';

@Injectable()
export class SuppliersService {
  async list(query: IQuery, auth: IAuth) {
    const supp: any = SuppliersModel.query()
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder.whereILike('name', `%${query.q}%`);
        }
      })
      .orderBy('created_at', 'DESC')
      .page(query.page, query.pageSize);

    return await supp;
  }

  async generateCode(auth: IAuth) {
    const supp: any = await SuppliersModel.query()
      .select(raw('MAX(code) as code'))
      .where('company_id', auth.company_id)
      .first();

    return generateNo('SUP-', supp?.code, true);
  }
  async create(body: CreateSupplierDto, auth: IAuth) {
    if (!body.code) {
      body.code = await this.generateCode(auth);
    }

    const payload = {
      ...body,
      company_id: auth.company_id,
    };

    if (body.id) {
      const supp = await SuppliersModel.query().findOne({
        id: body.id,
        company_id: auth.company_id,
      });

      if (!supp) throw new NotFoundException();

      await supp.$query().patch(payload);
    } else {
      await SuppliersModel.query().insert(payload);
    }

    return 'data berhasil disimpan';
  }

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

  async destroy(id: number, auth: IAuth) {
    const supp = await SuppliersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!supp) throw new NotFoundException();

    await supp.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });

    return 'supplier berhasil di hapus';
  }
}
