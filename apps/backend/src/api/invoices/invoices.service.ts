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
      .where('id', id)
      .where((builder) => {
        if (auth.type !== 'cs') {
          builder.where('company_id', auth.company_id);
        }
      })
      .first();

    if (!wo) throw new NotFoundException();

    return wo;
  }
}
