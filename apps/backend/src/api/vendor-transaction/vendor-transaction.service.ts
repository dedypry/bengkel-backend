import { Injectable } from '@nestjs/common';
import { SuppliersModel } from 'models/suppliers.model';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { raw } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';
import { CreateVendorTrxDto } from './dto/vendor-transaction.dto';

@Injectable()
export class VendorTransactionService {
  async list(query: IQuery, auth: IAuth) {
    const result = await WorkOrderItemsModel.query()
      .alias('oi')
      .select(
        'supplier.id',
        'supplier.code',
        'supplier.name',
        raw('COUNT(oi.*) as total_item'),
      )
      .innerJoinRelated('[work_order,supplier]')
      .where('work_order.company_id', auth.company_id)
      .where('type', 'service')
      .where((builder) => {
        if (query.q) {
          builder.whereILike('supplier.name', `%${query.q}%`);
        }
      })
      .whereNotNull('supplier_id')
      .groupBy('supplier.id', 'supplier.code', 'supplier.name')
      .page(query.page, query.pageSize);

    return result;
  }

  async detail(id: number) {
    const supplier = await SuppliersModel.query().findById(id);
    const items = await WorkOrderItemsModel.query().where('supplier_id', id);
    const wo = await WorkOrdersModel.query().findById(items[0].work_order_id);

    return {
      supplier,
      wo,
      items,
    };
  }

  async createTrx(body: CreateVendorTrxDto, auth:) {
    return body;
  }
}
