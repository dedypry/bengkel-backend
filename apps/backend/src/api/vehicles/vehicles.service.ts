import { Injectable } from '@nestjs/common';
import { VehiclesModel } from 'models/vehicles.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class VehiclesService {
  async list(query: IQuery) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers.profile]')
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

  async getHistoryByPlateNo(plateNo: string) {
    return await WorkOrdersModel.query()
      .leftJoinRelated('[vehicle]')
      .withGraphFetched('[services,spareparts]')
      .where('vehicle.plate_number', plateNo);
  }

  async detailByPlate(plateNo: string) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers.profile]')
      .findOne('plate_number', plateNo);
  }
}
