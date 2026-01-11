import { Body, Injectable, NotFoundException } from '@nestjs/common';
import {
  MechanicRatting,
  UpdateMechanicWoDto,
  UpdateStatusWoDto,
  WoQuery,
  WorkOrderRequestDto,
} from './dto/work-order.dto';
import type { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { VehiclesModel } from 'models/vehicles.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { ServicesModel } from 'models/services.model';
import { ProductsModel } from 'models/products.model';
import { calculateTotalEstimation } from 'utils/helpers/global';
import { fn, raw } from 'objection';
import { CompaniesModel } from 'models/companies.model';
import dayjs from 'dayjs';
import { PromosModel } from 'models/promos.model';
import { MechanicRatingsModel } from 'models/mechanic-ratings.model';

@Injectable()
export class WorkOrderService {
  async list(query: WoQuery, auth: IAuth) {
    const data = await WorkOrdersModel.query()
      .alias('wo')
      .joinRelated('[vehicle, customer]')
      .withGraphFetched(
        '[services(srBuild),mechanics.profile,vehicle,customer.profile]',
      )
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('trx_no', `%${query.q}%`)
            .orWhereILike('vehicle.plate_number', `%${query.q}%`)
            .orWhereILike('customer.name', `%${query.q}%`);
        }
      })
      .where((builder) => {
        if (query.status && query.status != 'all') {
          builder.where('progress', query.status);
        }
      })
      .where('wo.company_id', auth.company_id)
      .orderByRaw(`CASE WHEN wo.status = 'closed' THEN 1 ELSE 0 END ASC`)
      .orderBy('wo.created_at', 'desc')
      .page(query.page, query.pageSize);

    const results = data.results.map((item) => {
      const estimation = calculateTotalEstimation(item.services as any);

      return {
        ...item,
        estimation,
      };
    });

    const stats: any = await WorkOrdersModel.query()
      .where('company_id', auth.company_id)
      .select(
        raw("count(*) filter (where progress = 'queue') as waiting"),
        raw("count(*) filter (where progress = 'on_progress') as processing"),
        raw("count(*) filter (where progress = 'finish') as completed"),
      )
      .first();

    return {
      results,
      total: data.total,
      stats: {
        total: data.total,
        waiting: Number(stats?.waiting || 0),
        processing: Number(stats?.processing || 0),
        completed: Number(stats?.completed || 0),
      },
    };
  }

  async detail(id: number, auth: IAuth) {
    const result = await WorkOrdersModel.query()
      .withGraphFetched(
        '[services,mechanics.profile,spareparts,vehicle,customer,payment]',
      )
      .findOne({
        id,
        company_id: auth.company_id,
      });

    if (!result) throw new NotFoundException();

    return result;
  }

  async createWO(body: WorkOrderRequestDto, auth: IAuth) {
    const result = await WorkOrdersModel.transaction(async (trx) => {
      const customerData = {
        ...(body.customer?.id && {
          id: body.customer.id,
        }),
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
        company_id: auth.company_id,
        updated_by: auth.id,
        profile: {
          full_name: body.customer.name,
          phone_number: body.customer.phone,
          model: 'customers',
          birth_date: body.customer.birth_date,
        },
      } as any;

      const customer = await CustomersModel.upsert(customerData, trx);

      const vehicle = await VehiclesModel.upsertAndRelate(
        {
          ...body.vehicle,
          company_id: auth.company_id,
          updated_by: auth.id,
        } as any,
        customer.id,
        trx,
      );

      const company = await CompaniesModel.query().findById(auth.company_id);

      const [service, sparepart] = await Promise.all([
        ServicesModel.query(trx)
          .whereIn(
            'id',
            body.services.map((e) => e.id),
          )
          .catch(() => []),
        ProductsModel.query(trx)
          .whereIn(
            'id',
            body.sparepart.map((e) => e.id),
          )
          .catch(() => []),
      ]);

      let serviceTotal = 0;
      let sparepartTotal = 0;
      const payloadItem = [
        ...service.map((item: any) => {
          const find = body.services.find((e) => e.id === item.id);
          const totalPrice = (find?.qty || 0) * (item?.price || 0);
          serviceTotal += totalPrice;
          return {
            data: item,
            type: 'service',
            qty: find?.qty,
            price: item.price,
            total_price: totalPrice,
          };
        }),
        ...sparepart.map((item: any) => {
          const find = body.sparepart.find((e) => e.id === item.id);
          const totalPrice = (find?.qty || 0) * (item?.sell_price || 0);
          sparepartTotal += totalPrice;
          return {
            data: item,
            type: 'sparepart',
            qty: find?.qty,
            price: item.sell_price,
            total_price: totalPrice,
          };
        }),
      ];

      const subTotal = sparepartTotal + serviceTotal;
      let promoBirtDate = 0;
      const promoData: PromosModel[] = [];

      const birthDate = customer?.profile?.birth_date;

      if (birthDate && company?.is_discount_birth_day) {
        const today = dayjs();
        const birthday = dayjs(birthDate);

        const isBirthdayToday =
          today.month() === birthday.month() &&
          today.date() === birthday.date();

        if (isBirthdayToday) {
          const type = company.type_discount_birth_day;
          const discountValue = Number(company.total_discount_birth_day || 0);
          const maxDiscount = Number(company.max_discount_birth_day || 0);

          if (type === 'percentage') {
            const totalP = (subTotal * discountValue) / 100;
            if (maxDiscount > 0) {
              promoBirtDate = Math.min(totalP, maxDiscount);
            } else {
              promoBirtDate = totalP;
            }
          } else {
            promoBirtDate = discountValue;
          }

          promoData.push({
            code: 'BIRTHDAY',
            name: 'PROMO ULANG TAHUN',
            is_active: true,
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            type: type,
            value: discountValue,
            max_discount: maxDiscount,
            company_id: auth.company_id,
            updated_by: auth.id,
            description: '',
            used_count: 0,
            quota: 0,
            min_purchase: 0,
            price: promoBirtDate,
          } as any);
        }
      }

      const dpp = Math.max(0, subTotal - promoBirtDate);

      const ppnAmount = company?.is_ppn
        ? (dpp * Number(company.ppn || 0)) / 100
        : 0;

      const grandTotal = dpp + ppnAmount;

      const woPayload = {
        current_km: body.current_km,
        priority: body.priority,
        company_id: auth.company_id,
        customer_id: customer.id,
        vehicle_id: vehicle.id,
        updated_by: auth.id,
        status: 'queue',
        progress: 'queue',
        ...(!body.id && {
          trx_no: await this.generateTrxNo(trx, auth),
        }),
        sparepart_total: sparepartTotal,
        service_total: serviceTotal,
        sub_total: subTotal,
        grand_total: grandTotal,
        ...(company?.is_ppn && {
          ppn_amount: ppnAmount,
          ppn_percent: company?.ppn,
        }),
        promo_amount: promoBirtDate,
        promo_data: JSON.stringify(promoData),
        items: payloadItem,
      };

      const wo = await WorkOrdersModel.query(trx).upsertGraphAndFetch(
        {
          ...(body.id && {
            id: body.id,
          }),
          ...woPayload,
        },
        {
          relate: true,
          unrelate: true,
        },
      );
      return wo;
    });
    return {
      message: 'Order Berhasil disimpan',
      data: result,
    };
  }

  async generateTrxNo(trx: any, auth: IAuth) {
    const lastOrder = await WorkOrdersModel.query(trx)
      .select('trx_no')
      .where('trx_no', 'like', 'TRX%')
      .where('company_id', auth.company_id)
      .orderBy('id', 'desc')
      .first();

    let nextNumber = 1;

    if (lastOrder && lastOrder.trx_no) {
      const lastNumber = parseInt(lastOrder.trx_no.replace('TRX', ''), 10);
      nextNumber = lastNumber + 1;
    }
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    return `TRX${formattedNumber}`;
  }

  async updateProgres(id: number, body: UpdateStatusWoDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query()
      .withGraphFetched('mechanics')
      .findOne({
        id,
        company_id: auth.company_id,
      });

    if (!wo) throw new NotFoundException();

    await wo.$query().patch({
      ...body,
      ...(body.progress === 'on_progress' && {
        start_at: fn.now(),
      }),
      ...(body.progress === 'ready' && {
        end_at: fn.now(),
      }),
    });

    await Promise.all(
      (wo.mechanics || []).map(async (mechanic) => {
        if (body.progress === 'on_progress') {
          await mechanic.$query().patch({ work_status: 'busy' });
        } else if (body.progress === 'ready') {
          const activeJob = await WorkOrdersModel.query()
            .alias('wo')
            .joinRelated('mechanics')
            .where('mechanics.id', mechanic.id)
            .whereNot('wo.id', id)
            .whereIn('wo.progress', ['pending', 'on_progress'])
            .first();

          await mechanic.$query().patch({
            work_status: activeJob ? 'busy' : 'ready',
          });
        }
      }),
    );
  }

  async updateMechanichs(id: number, body: UpdateMechanicWoDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    return await WorkOrdersModel.transaction(async (trx) => {
      await WorkOrdersModel.query(trx).upsertGraph(
        {
          id: id,
          mechanics: body.ids.map((id) => ({ id })),
        },
        {
          relate: true,
          unrelate: true,
          noUpdate: true,
        },
      );
      return { message: 'Mekanik berhasil diperbarui' };
    });
  }

  async mechanicRatting(@Body() body: MechanicRatting, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id: body.work_order_id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    await MechanicRatingsModel.query().insertGraph(
      body.mechanics?.map((item) => ({
        work_order_id: body.work_order_id,
        mechanic_id: item.id,
        supervisor_id: auth.id,
        rating: item.rating,
        notes: item.notes,
        company_id: auth.company_id,
      })),
    );

    return 'Berhasil kasih ratting';
  }
}
