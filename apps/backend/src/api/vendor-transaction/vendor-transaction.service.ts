import { Injectable } from '@nestjs/common';
import { SuppliersModel } from 'models/suppliers.model';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { raw } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';
import { CreateVendorTrxDto } from './dto/vendor-transaction.dto';
import { VendorTransactionModel } from 'models/vendor-transaction.model';
import { SettingsModel } from 'models/settings.model';
import { generateNo } from 'utils/helpers/global';

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
      .whereNull('vendor_transaction_id')
      .groupBy('supplier.id', 'supplier.code', 'supplier.name')
      .page(query.page, query.pageSize);

    return result;
  }

  async listPayment(query: IQuery, auth: IAuth) {
    return await VendorTransactionModel.query()
      .alias('vt')
      .select(
        'vt.*',
        VendorTransactionModel.relatedQuery('items').count().as('total_item'),
      )
      .withGraphFetched('[supplier]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder.whereILike('invoice_no', `%${query.q}%`);
        }
      })
      .orderBy('vt.created_at', 'desc')
      .page(query.page, query.pageSize);
  }

  async getNumber() {
    const setting = await SettingsModel.query().findOne(
      'key',
      'job_order_prefix',
    );
    const prefix = setting?.value || 'OPL.';

    const trx: any = await VendorTransactionModel.query()
      .select(raw('max(purchase_no) as max_no'))
      .first();

    return generateNo(prefix, trx?.max_no);
  }

  async detail(id: number) {
    const purchase_no = await this.getNumber();
    console.log(purchase_no);
    const supplier = await SuppliersModel.query().findById(id);
    const items = await WorkOrderItemsModel.query()
      .where('supplier_id', id)
      .whereNull('vendor_transaction_id');

    return {
      supplier,
      purchase_no,
      items,
    };
  }

  async createTrx(body: CreateVendorTrxDto, auth: IAuth) {
    return await VendorTransactionModel.transaction(async (trx) => {
      const poNo = await this.getNumber();
      const trxPayload: any = {
        supplier_id: body.supplierId,
        purchase_no: poNo,
        invoice_no: body.invoiceNo,
        payment_type: body.paymentType,
        payment_method: body.paymentMethod,
        due_days: body.dueDays,
        due_date: body.dueDate,
        signature_id: body.signatureId,
        tax: body.tax,
        discount: body.finalDiscValue,
        other_fees: body.otherFees,
        subtotal: body.subTotal,
        total: body.total,
        company_id: auth.company_id,
      };

      const vendorTrx =
        await VendorTransactionModel.query(trx).insert(trxPayload);

      const itemPayload = body.items.map((item) => ({
        id: item.id,
        vendor_transaction_id: vendorTrx.id,
        purchase_price: item.purchasePrice,
        disc_percentage: item.discPercentage,
        disc_value: item.discValue,
        tax_percentage: item.taxPercentage,
      }));

      await WorkOrderItemsModel.query(trx).upsertGraph(itemPayload);

      return 'data berhasil disimpan';
    });
  }
}
