import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkOrdersModel } from 'models/work-orders.model';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class InvoicesService {
  async payment(id: number, auth: IAuth) {
    const wo = await WorkOrdersModel.query()
      .withGraphFetched(
        '[items,services,spareparts,vehicle,customer.profile,mechanics,company]',
      )
      .findOne({
        id,
        company_id: auth.company_id,
      });

    if (!wo) throw new NotFoundException();

    return wo;
  }
}
