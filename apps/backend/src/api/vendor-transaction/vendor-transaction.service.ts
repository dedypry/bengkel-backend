/* eslint-disable @typescript-eslint/no-misused-promises */
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
    const supplier = await SuppliersModel.query().findById(id);
    const items = await WorkOrderItemsModel.query()
      .alias('wi')
      .select('wi.*', 'work_order.trx_no')
      .innerJoinRelated('[work_order]')
      .where('supplier_id', id)
      .whereNull('vendor_transaction_id');

    return {
      supplier,
      purchase_no,
      items,
    };
  }

  async detailPayment(id: number) {
    const result = await VendorTransactionModel.query()
      .withGraphFetched('[items(item), supplier]')
      .findById(id)
      .modifiers({
        item: (query) =>
          query
            .alias('wi')
            .select('wi.*', 'work_order.trx_no')
            .joinRelated('work_order'),
      });

    return result;
  }

  async createTrx(body: CreateVendorTrxDto, auth: IAuth) {
    return await VendorTransactionModel.transaction(async (trx) => {
      const trxPayload: any = {
        supplier_id: body.supplierId,
        invoice_no: body.invoiceNo,
        payment_type: body.paymentType,
        date: body.date,
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
        notes: body.notes,
        payment_method_data: body.paymentMethodData,
      };

      if (!body.id) {
        const poNo = await this.getNumber();
        trxPayload.purchase_no = poNo;
      }

      const vendorTrx = await VendorTransactionModel.query(trx)
        .upsertGraph(
          {
            ...(body.id && {
              id: body.id,
            }),
            ...trxPayload,
          },
          {
            insertMissing: true,
          },
        )
        .returning('id')
        .first();

      await WorkOrderItemsModel.query(trx)
        .where('vendor_transaction_id', vendorTrx.id)
        .patch({
          vendor_transaction_id: null,
          purchase_price: 0,
          disc_percentage: 0,
          disc_value: 0,
          tax_percentage: 0,
          total_payment: 0,
        });

      const itemPayload: any[] = body.items
        .filter((e) => e.select)
        .map((item) => ({
          id: item.id,
          vendor_transaction_id: vendorTrx.id,
          purchase_price: item.purchasePrice,
          disc_percentage: item.discPercentage,
          disc_value: item.discValue,
          tax_percentage: item.taxPercentage,
          total_payment: item.total,
          supplier_id: body.supplierId,
        }));

      await WorkOrderItemsModel.query(trx).upsertGraph(itemPayload, {
        noDelete: true,
        noInsert: true,
      });

      return 'data berhasil disimpan';
    });
  }
  async destroy(id: number) {
    await WorkOrderItemsModel.transaction(async (trx) => {
      await WorkOrderItemsModel.query(trx)
        .where('vendor_transaction_id', id)
        .patch({
          vendor_transaction_id: null,
          purchase_price: 0,
          disc_percentage: 0,
          disc_value: 0,
          tax_percentage: 0,
          total_payment: 0,
        });

      await VendorTransactionModel.query(trx).deleteById(id);
    });

    return 'Data Berhasil di hapus';
  }
}
