import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePoDto, PoQuery } from './dto/po.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { PoModel } from 'models/po.model';
import { fn, raw } from 'objection';
import { generateNo } from 'utils/helpers/global';
import { SuppliersModel } from 'models/suppliers.model';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import GeneratePDF from 'utils/services/pdf-make.service';
import terbilang from '@gratcy/angka-terbilang-indonesia';
import { ZipArchive } from 'archiver';
import { PassThrough } from 'node:stream';

@Injectable()
export class PoService {
  async list(query: PoQuery, auth: IAuth) {
    const data = await PoModel.query()
      .alias('po')
      .withGraphFetched('[supplier,warehouse]')
      .leftJoinRelated('[supplier]')
      .where('po.company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('po_no', `%${query.q}%`)
            .orWhereILike('po.notes', `%${query.q}%`)
            .orWhereILike('po.invoice_no', `%${query.q}%`)
            .orWhereILike('supplier.name', `%${query.q}%`);
        }

        if (query.date) {
          builder.whereRaw('DATE(po.date) = ?', [query.date]);
        }
        if (query.supplier_id) {
          builder.where('po.supplier_id', query.supplier_id);
        }

        if (query.date_from) {
          builder.whereRaw('DATE(po.date) >= ?', [query.date_from]);
        }
        if (query.date_to) {
          builder.whereRaw('DATE(po.date) <= ?', [query.date_to]);
        }
      })
      .whereNull('po.deleted_at')
      .orderBy('po.id', 'desc')
      .page(query.page, query.pageSize);

    const supplierId = await PoModel.query()
      .select('supplier_id')
      .where('company_id', auth.company_id)
      .whereNull('deleted_at')
      .groupBy('supplier_id');

    const suppliers = await SuppliersModel.query()
      .whereIn(
        'id',
        supplierId.map((e) => e.supplier_id),
      )
      .select('id', 'name');

    return {
      ...data,
      stats: { suppliers },
    };
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

  private sanitizeFileName(name: string) {
    return name.replace(/[^\w.-]+/g, '_');
  }

  async buildInvoicePdf(id: number, auth: IAuth) {
    const po = await this.detail(id, auth);

    if (!po) {
      throw new NotFoundException('PO tidak ditemukan');
    }

    const items = (po.items || []).map((item) => ({
      ...item,
      product: item.product || { code: '-', name: '-', unit: '-' },
    }));

    const totalQty = items.reduce(
      (sum, item) => sum + Number(item.qty || 0),
      0,
    );

    const html = await renderHtml({
      location: 'po-invoice',
      data: {
        ...po,
        items,
        supplier: po.supplier || { name: '-', address: '-', phone: '-' },
        created_by: po.created_by || { name: '-' },
        signature: po.signature || { name: '-' },
        payment_method: po.payment_method || po.payment_type || 'cash',
        totalQty,
        terbilang: terbilang(Number(po.total || 0), {
          dec: '',
          lang: 'id',
        }),
      },
    });

    const content = await layoutPDF({
      header: 'FAKTUR PEMBELIAN',
      content: [html],
      companyId: auth.company_id,
      invNo: po.po_no,
      date: po.created_at,
    });

    const buffer = await GeneratePDF.toBuffer(content);

    return {
      buffer,
      fileName: this.sanitizeFileName(po.po_no || `PO-${po.id}`),
    };
  }

  async buildInvoicesZip(ids: number[], auth: IAuth) {
    const uniqueIds = [...new Set(ids.map(Number))].filter(Boolean);

    if (!uniqueIds.length) {
      throw new BadRequestException('Pilih minimal 1 PO');
    }

    const archive = new ZipArchive({ zlib: { level: 9 } });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on('data', (chunk) => chunks.push(chunk));

    const zipPromise = new Promise<Buffer>((resolve, reject) => {
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
      archive.on('error', reject);
    });

    archive.pipe(stream);

    for (const id of uniqueIds) {
      const { buffer, fileName } = await this.buildInvoicePdf(id, auth);
      archive.append(buffer, { name: `${fileName}.pdf` });
    }

    await archive.finalize();
    return zipPromise;
  }
}
