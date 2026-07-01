import { Injectable } from '@nestjs/common';
import { WarehousesModel } from 'models/warehouses.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { raw } from 'objection';
import { generateNo } from 'utils/helpers/global';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class WarehouseService {
  async list(query: IQuery, auth: IAuth) {
    let qb = WarehousesModel.query()
      .withGraphFetched('[province, city, district]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .where(raw(`LOWER(name) ILIKE LOWER('%${query.q}%')`))
            .orWhere(raw(`LOWER(code) ILIKE LOWER('%${query.q}%')`));
        }
      })
      .orderBy('created_at', 'desc');

    if (query.noPaginate == 1) {
      return await qb;
    }

    return qb.page(query.page, query.pageSize);
  }

  async exportList(query: IQuery, auth: IAuth): Promise<WarehousesModel[]> {
    return WarehousesModel.query()
      .withGraphFetched('[province, city, district]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .where(raw(`LOWER(name) ILIKE LOWER('%${query.q}%')`))
            .orWhere(raw(`LOWER(code) ILIKE LOWER('%${query.q}%')`));
        }
      })
      .orderBy('created_at', 'desc');
  }

  async create(body: CreateWarehouseDto, auth: IAuth) {
    const generateCode: any = await WarehousesModel.query()
      .select(raw('MAX(code) as last_code'))
      .where('company_id', auth.company_id)
      .first();

    if (body.id) {
      await WarehousesModel.query()
        .findById(body.id)
        .patch({
          ...body,
          updated_id: auth.id,
        });
    } else {
      await WarehousesModel.query().insert({
        ...body,
        code: generateNo('GUD.', generateCode?.last_code),
        company_id: auth.company_id,
        created_id: auth.id,
      });
    }

    return `Gudang berhasil ${body.id ? 'diperbarui' : 'ditambahkan'}`;
  }

  async destroy(id: number, auth: IAuth) {
    const checkData = await WarehousesModel.query()
      .findById(id)
      .where('company_id', auth.company_id);

    if (!checkData) {
      return 'Gudang tidak ditemukan';
    }

    await checkData.$query().delete();

    return `Gudang ${checkData.name} berhasil dihapus`;
  }
}
