import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayment } from './dto/payments.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { PromosModel } from 'models/promos.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { PaymentsModel } from 'models/payments.model';
import { fn, raw } from 'objection';
import { ProductsModel } from 'models/products.model';
import { OrdersModel } from 'models/orders.model';
import { IQuery } from 'utils/interfaces/query';
import { SettingsModel } from 'models/settings.model';
import { generateNo } from 'utils/helpers/global';

@Injectable()
export class PaymentsService {
  async list(query: IQuery, auth: IAuth) {
    return await PaymentsModel.query()
      .alias('py')
      .leftJoinRelated('[work_order.customer, cashier.profile]')
      .withGraphFetched('[work_order.customer,cashier.profile]')
      .where('py.company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('payment_no', `%${query.q}%`)
            .orWhereILike('reference_no', `%${query.q}%`)
            .orWhereILike('work_order:customer.name', `%${query.q}%`)
            .orWhereILike('cashier.name', `%${query.q}%`);
        }
      })
      .page(query.page, query.pageSize);
  }
  async createPayment(body: CreatePayment, auth: IAuth) {
    await PromosModel.transaction(async (trx) => {
      let promo = null as PromosModel | null | undefined;
      const now = new Date().toISOString();
      if (body.promoCode) {
        promo = await PromosModel.query(trx)
          .where('code', body.promoCode)
          .andWhere('company_id', auth.company_id)
          .andWhere('is_active', true)
          .andWhere('start_date', '<=', now)
          .andWhere('end_date', '>=', now)
          .andWhere((query) => {
            query.where('quota', 0).orWhereRaw('used_count < quota');
          })
          .forUpdate()
          .first();
        if (!promo)
          throw new NotFoundException(
            'Promo sudah tidak berlaku atau kuota habis',
          );
      }

      const wo = await WorkOrdersModel.query(trx)
        .where('id', body.woId)
        .where('company_id', auth.company_id)
        .whereNot('status', 'finish')
        .first();

      if (!wo) throw new NotFoundException('WO');

      let newGrandTotal = wo.grand_total;

      let payloadWo: any = {
        updated_by: auth.id,
        status: 'closed',
        progress: 'finish',
      };

      if (promo) {
        const subtotal = Number(wo.sub_total);
        let calculatedDiscount = 0;

        if (subtotal < Number(promo.min_purchase)) {
          throw new BadRequestException(
            `Minimal pembelian untuk promo ini adalah Rp ${Number(promo.min_purchase).toLocaleString()}`,
          );
        }

        if (promo.type === 'percentage') {
          const discountAmount = (subtotal * Number(promo.value)) / 100;
          const maxDiscount = Number(promo.max_discount);
          calculatedDiscount =
            maxDiscount > 0
              ? Math.min(discountAmount, maxDiscount)
              : discountAmount;
        } else {
          calculatedDiscount = Number(promo.value);
        }

        const ppnPercent = Number(wo.ppn_percent);
        const netAfterDiscount = subtotal - calculatedDiscount;
        const newPpnAmount = (netAfterDiscount * ppnPercent) / 100;
        newGrandTotal = netAfterDiscount + newPpnAmount;

        let currentPromoData = Array.isArray(wo.promo_data)
          ? wo.promo_data
          : [];

        const findIndex = currentPromoData.findIndex(
          (item) => item.id === promo.id,
        );

        const newPromo = {
          ...promo,
          price: calculatedDiscount,
        };

        if (findIndex >= 0) {
          currentPromoData[findIndex] = newPromo;
        } else {
          currentPromoData = [...currentPromoData, newPromo];
        }

        payloadWo = {
          ...payloadWo,
          promo_amount: calculatedDiscount,
          promo_data: JSON.stringify(currentPromoData),
          ppn_amount: newPpnAmount,
          grand_total: newGrandTotal,
        };

        await promo
          .$query(trx)
          .patch({ used_count: Number(promo.used_count || 0) + 1 });
      }

      await wo.$query(trx).patch(payloadWo);

      const payment = await PaymentsModel.query(trx).insert({
        work_order_id: wo?.id,
        payment_no: `PAY-${Date.now()}`,
        amount: newGrandTotal,
        method: body.paymentMethod,
        payment_date: fn.now(),
        reference_no: wo.trx_no,
        updated_by: auth.id,
        received_amount: body.receivedAmount,
        proof_image: body.proofImage,
        company_id: auth.company_id,
      } as any);
      return payment;
    });
    return 'Pembayaran Berhasil';
  }

  async generateTrxNo(companyId: number) {
    const setting = await SettingsModel.query()
      .where('company_id', companyId)
      .where('key', 'sales_order_prefix')
      .first();

    const prefix = setting?.value || 'SO.';

    const trx: any = await OrdersModel.query()
      .select(raw('max(trx_no) as max_no'))
      .where('trx_no', 'like', `${prefix}%`)
      .first();

    console.log(trx);
    return generateNo(prefix, trx?.max_no);
  }

  async createPaymentProduct(body: CreatePayment, auth: IAuth) {
    const result = await OrdersModel.transaction(async (trx) => {
      const trxNo = await this.generateTrxNo(auth.company_id);
      const products = await ProductsModel.query()
        .whereIn('id', body.products?.map((item) => item.id) || [])
        .where('company_id', auth.company_id);

      let grand_total = 0;

      const items = [];

      for (const e of products) {
        const find = body.products?.find((fn) => fn.id === e.id);
        const qty = Number(find?.qty || 0);

        const total_price = qty * Number(e.sell_price);
        grand_total += total_price;

        await e.$query(trx).patch({
          stock: e.stock - qty,
        });

        items.push({
          data: e,
          qty,
          product_id: e.id,
          price: e.sell_price,
          total_price,
        });
      }

      const order = await OrdersModel.query(trx).insertGraph({
        trx_no: trxNo,
        grand_total,
        company_id: auth.company_id,
        updated_id: auth.id,
        items,
      });

      const payment = await PaymentsModel.query(trx).insert({
        order_id: order.id,
        payment_no: trxNo,
        amount: grand_total,
        method: body.paymentMethod,
        payment_date: fn.now(),
        reference_no: trxNo,
        updated_by: auth.id,
        received_amount: body.receivedAmount,
        proof_image: body.proofImage,
        company_id: auth.company_id,
      } as any);

      return payment;
    });

    return {
      data: result,
      message: 'berhasil disimpan',
    };
  }

  async paymentDetail(id: number, auth: IAuth) {
    const result = await PaymentsModel.query()
      .withGraphFetched(
        '[order.items,work_order.[services,spareparts],cashier,company]',
      )
      .findOne({
        id: id,
        company_id: auth.company_id,
      });

    if (!result) throw new NotFoundException();

    return result;
  }
}
