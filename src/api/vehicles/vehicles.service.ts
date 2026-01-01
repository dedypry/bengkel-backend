import { Injectable } from '@nestjs/common';
import { VehiclesModel } from 'models/vehicles.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class VehiclesService {
  async list(query: IQuery) {
    return await VehiclesModel.query()
      .withGraphFetched('[customers]')
      .page(query.page, query.pageSize);
  }
}
