import { Injectable } from '@nestjs/common';
import { ServicesModel } from 'models/services.model';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class ServicesService {
  async list(query: IQuery) {
    return await ServicesModel.query()
      .withGraphFetched('[category]')
      .orderBy('created_at', 'desc')
      .page(query.page, query.pageSize);
  }
}
