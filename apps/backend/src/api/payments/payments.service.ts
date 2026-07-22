import { Injectable, NotFoundException } from '@nestjs/common';
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
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { CustomerEmailService } from 'utils/services/customer-email.service';
import { PusherService } from '../notifications/pusher.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly customerEmailService: CustomerEmailService,
    private readonly pusherService: PusherService,
  ) {}
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
      .orderBy('id', 'DESC')
      .page(query.page, query.pageSize);
  }
  async createPayment(body: CreatePayment, auth: IAuth) {
    await PromosModel.transaction(async (trx) => {
      let promo = null as PromosModel | null | undefined;
      const now = new Date().toISOString();
      if (body.promo_code) {
        promo = await PromosModel.query(trx)
          .where('code', body.promo_code)
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

      const payloadWo: any = {
        updated_by: auth.id,
        status: 'closed',
        progress: 'finish',
        other_fee: body.other_fee,
        disc_percentage: body.disc_percentage,
        disc_value: body.disc_value,
        ppn_amount: body.tax,
        grand_total: body.total,
        sub_total: body.sub_total,
        sparepart_total: 0,
        service_total: 0,
      };

      // if (promo) {
      //   const subtotal = Number(wo.sub_total);
      //   let calculatedDiscount = 0;

      //   if (subtotal < Number(promo.min_purchase)) {
      //     throw new BadRequestException(
      //       `Minimal pembelian untuk promo ini adalah Rp ${Number(promo.min_purchase).toLocaleString()}`,
      //     );
      //   }

      //   if (promo.type === 'percentage') {
      //     const discountAmount = (subtotal * Number(promo.value)) / 100;
      //     const maxDiscount = Number(promo.max_discount);
      //     calculatedDiscount =
      //       maxDiscount > 0
      //         ? Math.min(discountAmount, maxDiscount)
      //         : discountAmount;
      //   } else {
      //     calculatedDiscount = Number(promo.value);
      //   }

      //   const ppnPercent = Number(wo.ppn_percent);
      //   const netAfterDiscount = subtotal - calculatedDiscount;
      //   const newPpnAmount = (netAfterDiscount * ppnPercent) / 100;
      //   newGrandTotal = netAfterDiscount + newPpnAmount;

      //   let currentPromoData = Array.isArray(wo.promo_data)
      //     ? wo.promo_data
      //     : [];

      //   const findIndex = currentPromoData.findIndex(
      //     (item) => item.id === promo.id,
      //   );

      //   const newPromo = {
      //     ...promo,
      //     price: calculatedDiscount,
      //   };

      //   if (findIndex >= 0) {
      //     currentPromoData[findIndex] = newPromo;
      //   } else {
      //     currentPromoData = [...currentPromoData, newPromo];
      //   }

      //   payloadWo = {
      //     ...payloadWo,
      //     promo_amount: calculatedDiscount,
      //     promo_data: JSON.stringify(currentPromoData),
      //     ppn_amount: newPpnAmount,
      //     grand_total: newGrandTotal,
      //   };

      //   await promo
      //     .$query(trx)
      //     .patch({ used_count: Number(promo.used_count || 0) + 1 });
      // }

      const itemsData = await WorkOrderItemsModel.query(trx).where(
        'work_order_id',
        wo.id,
      );

      const itemids = body.products.map((e) => e.id);

      const deleteItems = itemsData.filter((e) => !itemids.includes(e.id));

      if (deleteItems.length) {
        for (const delItem of deleteItems) {
          if (delItem.type === 'sparepart') {
            const product = await ProductsModel.query(trx).findById(
              delItem.data.id,
            );

            await product.$query(trx).patch({
              stock: product.stock + delItem.qty,
            });
          }

          await delItem.$query(trx).delete();
        }
      }

      for (const item of body.products) {
        const woItem = itemsData.find((e) => e.id === item.id);
        const product = await ProductsModel.query(trx).findById(
          item.product_id,
        );

        if (woItem.type === 'sparepart') {
          payloadWo.sparepart_total += item.total_price;
        } else {
          payloadWo.service_total += item.total_price;
        }

        if (woItem) {
          if (woItem.type === 'sparepart') {
            await product.$query(trx).patch({
              stock: product.stock + woItem.qty - item.qty,
            });
          }

          await woItem.$query(trx).patch({
            qty: item.qty,
            price: item.price,
            total_price: item.total_price,
            disc_percentage: item.disc_percentage,
            disc_value: item.disc_value,
            total_payment: item.total_price,
            tax_percentage: item.tax,
            purchase_price: item.price,
          });
        } else {
          await product.$query(trx).patch({
            stock: product.stock - item.qty,
          });

          await WorkOrderItemsModel.query(trx).insert({
            data: product,
            qty: item.qty,
            price: item.price,
            total_price: item.total_price,
            disc_percentage: item.disc_percentage,
            disc_value: item.disc_value,
            total_payment: item.total_price,
            tax_percentage: item.tax,
            purchase_price: item.price,
            work_order_id: wo.id,
            status: 'finish',
            updated_by: auth.id,
            type: body.type,
          });
        }
      }

      await wo.$query(trx).patch(payloadWo);
      const payloadPayment: any = {
        work_order_id: wo?.id,
        amount: body.total,
        method: body.payment_method,
        payment_date: fn.now(),
        reference_no: wo.trx_no,
        updated_by: auth.id,
        received_amount: body.received_amount,
        proof_image: body.proof_image,
        company_id: auth.company_id,
      };
      const dataPayment = await PaymentsModel.query(trx).findOne(
        'work_order_id',
        wo.id,
      );

      if (!dataPayment) {
        payloadPayment['payment_no'] = `PAY-${Date.now()}`;
        await PaymentsModel.query(trx).insert(payloadPayment);
      } else {
        await dataPayment.$query(trx).patch(payloadPayment);
      }

      await this.customerEmailService.scheduleNextServiceReminder(
        wo.id,
        auth.company_id,
        trx,
      );

      return true;
    });

    void this.customerEmailService.notifyPaymentComplete(body.woId, auth.company_id);
    void this.customerEmailService.notifyInvoice(body.woId, auth.company_id);
    void this.broadcastServiceUpdate(body.woId, auth.company_id, 'payment_completed', {
      progress: 'finish',
    });

    return 'Pembayaran Berhasil';
  }

  private async broadcastServiceUpdate(
    workOrderId: number,
    companyId: number,
    action: string,
    meta: Record<string, unknown> = {},
  ) {
    try {
      await this.pusherService.notifyCompanyService(
        companyId,
        'service.updated',
        {
          action,
          company_id: companyId,
          work_order_id: workOrderId,
          updated_at: new Date().toISOString(),
          ...meta,
        },
      );
    } catch (error) {
      console.error('Pusher service broadcast failed:', error);
    }
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

    return generateNo(prefix, trx?.max_no);
  }

  async createPaymentProduct(body: CreatePayment, auth: IAuth) {
    const result = await OrdersModel.transaction(async (trx) => {
      const trxNo = await this.generateTrxNo(auth.company_id);
      const products = await ProductsModel.query()
        .whereIn('id', body.products?.map((item) => item.id) || [])
        .where('company_id', auth.company_id);

      const items = [];

      for (const e of products) {
        const find = body.products?.find((fn) => fn.id === e.id);

        await e.$query(trx).patch({
          stock: e.stock - find.qty,
        });

        items.push({
          data: e,
          product_id: e.id,
          ...find,
          id: undefined,
        });
      }

      const order = await OrdersModel.query(trx).insertGraph({
        trx_no: trxNo,
        discount: body.disc_value,
        dic_percentage: body.disc_percentage,
        signature_id: body.signature_id,
        notes: body.notes,
        tax: body.tax,
        subtotal: body.sub_total,
        other_fee: body.other_fee,
        po_no: body.po_no,
        customer_id: body.customer_id,
        grand_total: body.total,
        company_id: auth.company_id,
        updated_id: auth.id,
        items,
      });

      const payment = await PaymentsModel.query(trx).insert({
        order_id: order.id,
        payment_no: trxNo,
        amount: body.total,
        method: body.payment_method,
        payment_date: fn.now(),
        reference_no: trxNo,
        updated_by: auth.id,
        received_amount: body.received_amount,
        proof_image: body.proof_image,
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
        '[order.[items,customer.profile],work_order.[services,spareparts],cashier,company]',
      )
      .findOne({
        id: id,
        company_id: auth.company_id,
      });

    if (!result) throw new NotFoundException();

    return result;
  }
}
