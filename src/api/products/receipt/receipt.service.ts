import { Injectable } from '@nestjs/common';
import { GoodsReceiptsModel } from 'models/goods-receipts.model';
import { ProductsModel } from 'models/products.model';
import { fn, raw } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import { ProductReceiptDto } from '../dto/products.dto';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class ReceiptService {
  async list(query: IQuery, auth: IAuth) {
    return await GoodsReceiptsModel.query()
      .alias('gr')
      .select([
        'gr.*',
        GoodsReceiptsModel.relatedQuery('items').count().as('total_items'),
        GoodsReceiptsModel.relatedQuery('items')
          .sum('qty_receipt')
          .as('total_qty'),
        GoodsReceiptsModel.relatedQuery('items')
          .sum(raw('qty_receipt * purchase_price'))
          .as('total_amount'),
      ])
      .withGraphFetched('[supplier,received]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('grn_number', `%${query.q}%`)
            .orWhereILike('po_number', `%${query.q}%`);
        }
      })
      .page(query.page, query.pageSize);
  }
  async generateGsNumber(auth: IAuth, trx?: any) {
    const lastOrder = await GoodsReceiptsModel.query(trx)
      .select('grn_number')
      .where('grn_number', 'like', 'GR%')
      .where('company_id', auth.company_id)
      .orderBy('id', 'desc')
      .first();

    let nextNumber = 1;

    if (lastOrder && lastOrder.grn_number) {
      const lastNumber = parseInt(lastOrder.grn_number.replace('TRX', ''), 10);
      nextNumber = lastNumber + 1;
    }
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    return `GR${formattedNumber}`;
  }

  async detail(id: number, auth: IAuth) {
    console.log('MASUK');
    const result = await GoodsReceiptsModel.query()
      .alias('gr')
      .select([
        'gr.*',
        GoodsReceiptsModel.relatedQuery('items').count().as('total_items'),
        GoodsReceiptsModel.relatedQuery('items')
          .sum('qty_receipt')
          .as('total_qty'),
        GoodsReceiptsModel.relatedQuery('items')
          .sum(raw('qty_receipt * purchase_price'))
          .as('total_amount'),
      ])
      .withGraphFetched('[supplier,received, items.product]')
      .findOne({
        id,
        company_id: auth.company_id,
      });
    console.log(result);
    return result;
  }

  async receiptProduct(body: ProductReceiptDto, auth: IAuth) {
    await GoodsReceiptsModel.transaction(async (trx) => {
      const payload = {
        ...(body.id
          ? {
              id: body.id,
            }
          : {
              grn_number: await this.generateGsNumber(auth, trx),
            }),
        po_number: body.poNumber,
        supplier_id: body.supplierId,
        received_id: auth.id,
        receipt_at: fn.now(),
        delivery_note_no: body.suratJalanNumber,
        expedition: body.expedition,
        driver_name: body.driverName,
        license_plate: body.policeNumber,
        notes: body.notes,
        company_id: auth.company_id,
        items: body.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          condition: item.condition,
          qty_po: item.qtyPo,
          qty_receipt: item.qtyRec,
          purchase_price: item.purchasePrice,
        })),
      };

      await GoodsReceiptsModel.query(trx).upsertGraph(payload as any);

      await Promise.all(
        body.items.map((item) =>
          ProductsModel.query(trx)
            .findById(item.productId)
            .increment('stock', item.qtyRec),
        ),
      );
    });

    return 'data berhasil disimpan';
  }
}
