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
import { fn } from 'objection';

@Injectable()
export class PaymentsService {
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
      } as any);
      return payment;
    });
    return 'Pembayaran Berhasil';
  }
}
