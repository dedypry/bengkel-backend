import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoDto } from './dto/po.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { PoModel } from 'models/po.model';
import { fn, raw } from 'objection';
import { generateNo } from 'utils/helpers/global';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class PoService {
  async list(query: IQuery, auth: IAuth) {
    return await PoModel.query()
      .withGraphFetched('[supplier,warehouse]')
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('po_no', `%${query.q}%`)
            .orWhereILike('notes', `%${query.q}%`);
        }
      })
      .whereNull('deleted_at')
      .orderBy('id', 'desc')
      .page(query.page, query.pageSize);
  }

  async detail(id: number, auth: IAuth) {
    return await PoModel.query()
      .withGraphFetched(
        '[supplier, items.product, warehouse, signature, created_by]',
      )
      .where('id', id)
      .where('company_id', auth.company_id)
      .first();
  }

  async generateTrxNo(trx: any, auth: IAuth) {
    const prefix = 'PO.';

    const data: any = await PoModel.query(trx)
      .select(raw('MAX(po_no) as last_po_no'))
      .where('company_id', auth.company_id)
      .first();

    return generateNo(prefix, data.last_po_no);
  }

  async create(body: CreatePoDto, auth: IAuth) {
    return await PoModel.transaction(async (trx) => {
      let poCode = body.po_no;

      if (!poCode) {
        poCode = await this.generateTrxNo(trx, auth);
      }

      const payload = {
        sub_total: body.sub_total,
        other_fee: body.other_fee,
        disc_percentage: body.disc_percentage,
        disc_value: body.disc_value,
        requested_date: body.requested_date || null,
        tax: body.tax,
        total: body.total,
        company_id: auth.company_id,
        warehouse_id: body.warehouse_id,
        date: body.date || null,
        supplier_id: body.supplier_id,
        term_credit: body.term_credit,
        notes: body.notes,
        signature_id: body.signature_id,
        closed_notes: body.closed_notes,
        status: body.status,
        due_date: body.due_date || null,
        due_day: body.due_days || 0,
        received_at: body.received_at || null,
        invoice_no: body.invoice_no,
        payment_type: body.payment_type,
      };

      const items = body.items.map((item) => ({
        product_id: item.id,
        qty: item.qty,
        price: item.price,
        disc_percentage: item.disc_percentage,
        disc_value: item.disc_value,
        ppn_percentage: item.ppn_percentage,
        total: item.total,
      }));

      if (body.id) {
        const result = await PoModel.query(trx).findById(body.id);
        await result.$query().patch(payload);
        await result.$relatedQuery('items').delete();
        await result.$relatedQuery('items').insert(items);
      } else {
        await PoModel.query(trx).insertGraph({
          ...payload,
          items,
          po_no: poCode,
          created_id: auth.id,
        });
      }

      return 'Data Berhasil disimpan';
    });
  }

  async destroy(id: number, auth: IAuth) {
    const data = await PoModel.query()
      .where('company_id', auth.company_id)
      .where('id', id)
      .first();

    if (!data) throw new NotFoundException('Data Tidak Ditemukan');

    await data.$query().patch({
      status: 'CANCELLED',
      deleted_at: fn.now(),
    });

    return 'Data Berhasil dihapus';
  }
}
