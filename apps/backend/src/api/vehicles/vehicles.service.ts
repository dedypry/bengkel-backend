import { Injectable } from '@nestjs/common';
import { VehiclesModel } from 'models/vehicles.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class VehiclesService {
  async list(query: IQuery) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('plate_number', `%${query.q}%`)
            .orWhereILike('brand', `%${query.q}%`)
            .orWhereILike('color', `%${query.q}%`)
            .orWhereILike('engine_number', `%${query.q}%`)
            .orWhereILike('fuel_type', `%${query.q}%`)
            .orWhereILike('model', `%${query.q}%`)
            .orWhereILike('vin_number', `%${query.q}%`);
        }
      })
      .orderBy('created_at', 'desc')
      .page(query.page, query.pageSize);
  }
}
