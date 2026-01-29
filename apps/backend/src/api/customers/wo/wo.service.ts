import { Injectable, NotFoundException } from '@nestjs/common';
import { ListWoDto } from './dto/wo.dto';
import { WorkOrdersModel } from 'models/work-orders.model';

@Injectable()
export class WoService {
  async list(data: ListWoDto) {
    return WorkOrdersModel.query()
      .withGraphFetched('[vehicle,services]')
      .where((builder) => {
        if (data.vehicle_id) {
          builder.where('vehicle_id', data.vehicle_id);
        }
      })
      .orderBy('created_at', 'desc')
      .page(data.page, data.pageSize);
  }

  async detail(id: number) {
    const wo = await WorkOrdersModel.query()
      .withGraphFetched('[vehicle,services,mechanics,spareparts]')
      .findById(id);

    if (!wo) throw new NotFoundException();

    return wo;
  }
}
