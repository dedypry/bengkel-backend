import { Body, Injectable, NotFoundException } from '@nestjs/common';
import {
  ChangeSugestionDto,
  ListPaymentQueryDto,
  MechanicRatting,
  UpdateMechanicWoDto,
  UpdateStatusWoDto,
  WoQuery,
  WorkOrderRequestDto,
  WorkOrderUpdateServiceDto,
} from './dto/work-order.dto';
import type { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { VehiclesModel } from 'models/vehicles.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { ServicesModel } from 'models/services.model';
import { ProductsModel } from 'models/products.model';
import { calculateTotalEstimation, generateNo } from 'utils/helpers/global';
import { fn, raw } from 'objection';
import { CompaniesModel } from 'models/companies.model';
import dayjs from 'dayjs';
import { PromosModel } from 'models/promos.model';
import { MechanicRatingsModel } from 'models/mechanic-ratings.model';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { BookingsModel } from 'models/bookings.model';
import { SettingsModel } from 'models/settings.model';

interface ICreateOrUpdateWoItem {
  woId: number;
  type: string;
  data: any[];
  items: WorkOrderItemsModel[];
  auth: IAuth;
  trx: any;
}
@Injectable()
export class WorkOrderService {
  async list(query: WoQuery, auth: IAuth) {
    const data = await WorkOrdersModel.query()
      .alias('wo')
      .joinRelated('[vehicle, customer]')
      .withGraphFetched('[services,mechanics.profile,vehicle,customer.profile]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('trx_no', `%${query.q}%`)
            .orWhereILike('vehicle.plate_number', `%${query.q}%`)
            .orWhereILike('customer.name', `%${query.q}%`);
        }
      })
      .where((builder) => {
        if (query.status && query.status != 'all' && !query.isHistory) {
          builder
            .where('progress', query.status)
            .orWhere('wo.status', query.status);
        }

        if (query.isHistory == 1) {
          builder.whereIn('wo.status', ['closed', 'cancel']);
        }

        if (query.noAuth != 1) {
          builder.where('wo.company_id', auth.company_id);
        }

        if (query.customerId) {
          builder.where('customer_id', query.customerId);
        }
      })
      .where((builder) => {
        if (query.date_from) {
          const start = dayjs(query.date_from).startOf('day').toISOString();
          builder.where('wo.created_at', '>=', start);
        }
        if (query.date_to) {
          const end = dayjs(query.date_to).endOf('day').toISOString();

          builder.where('wo.created_at', '<=', end);
        }

        if (query.date && !query.date_from && !query.date_to) {
          builder.whereRaw('DATE(wo.created_at) = ?', [query.date]);
        }
      })
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

  async listPayment(query: ListPaymentQueryDto, auth: IAuth) {
    return await WorkOrderItemsModel.query()
      .alias('woi')
      .select('woi.*', 'work_order.trx_no')
      .where('type', 'service')
      .where('work_order.company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereRaw(`data->>'name' ILIKE ?`, [`%${query.q}%`])
            .orWhereRaw(`data->>'code' ILIKE ?`, [`%${query.q}%`])
            .orWhereILike('work_order.trx_no', `%${query.q}%`);
        }

        if (query.supplier_id) {
          builder
            .where('supplier_id', query.supplier_id)
            .orWhereNull('supplier_id');
        } else {
          builder.whereNull('supplier_id');
        }
      })
      .whereNull('vendor_transaction_id')
      .leftJoinRelated('[work_order]');
  }

  async detail(id: number, auth: IAuth) {
    const result = await WorkOrdersModel.query()
      .withGraphFetched(
        '[services(supplier),mechanics.profile,spareparts(supplier),vehicle,customer,payment,company,pic,sa]',
      )
      .findOne({
        id,
        company_id: auth.company_id,
      })
      .modifiers({
        supplier: (builder) => {
          builder
            .alias('sr')
            .select('sr.*', 's.name as supplier_name')
            .leftJoin('suppliers as s', 's.id', 'sr.supplier_id');
        },
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
        name: body?.customer?.name,
        email: body?.customer?.email,
        phone: body?.customer?.phone,
        company_id: auth.company_id,
        updated_by: auth.id,
        profile: {
          full_name: body?.customer?.name,
          phone_number: body?.customer?.phone,
          model: 'customers',
          birth_date: body?.customer?.birth_date,
        },
      } as any;

      if (body.booking_id) {
        await BookingsModel.query(trx).findById(body.booking_id).update({
          status: 'CONFIRMED',
        });
      }

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

      // let promoBirtDate = 0;
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
            price: 0,
          } as any);
        }
      }

      const woPayload = {
        current_km: body.current_km,
        next_km: body.next_km,
        pic_id: body.pic_id || null,
        sa_id: body.sa_id || null,
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
        promo_data: JSON.stringify(promoData),
        complaints: body.complaints,
        booking_id: body.booking_id,
        ...(body.mechanic_ids.length > 0 && {
          mechanics: body.mechanic_ids.map((id) => ({ id })),
        }),
      };

      if (body.id) {
        woPayload['id'] = body.id;
      }

      const wo = await WorkOrdersModel.query(trx).upsertGraph(woPayload, {
        relate: true,
        unrelate: true,
      });

      await this.createOrUpdateWoItem({
        woId: wo.id,
        type: 'service',
        auth,
        data: body.services,
        trx,
        items: [],
      });

      await this.createOrUpdateWoItem({
        woId: wo.id,
        type: 'sparepart',
        auth,
        data: body.sparepart,
        trx,
        items: [],
      });

      const summary = await this.getSummary(wo, trx);

      const price = summary.sub_total;
      let calculatedPercentage = 0;

      if (price > 0) {
        calculatedPercentage = (Number(wo.disc_value) / price) * 100;
      }

      await wo.$query(trx).patch({
        ...summary,
        disc_percentage: calculatedPercentage,
      });

      return wo;
    });
    return {
      message: 'Order Berhasil disimpan',
      data: result,
    };
  }

  async generateTrxNo(trx: any, auth: IAuth) {
    const setting = await SettingsModel.query().findOne(
      'key',
      'service_reg_prefix',
    );
    const prefix = setting?.value || 'PKB.';

    const data: any = await WorkOrdersModel.query(trx)
      .select(raw('max(trx_no) as max_no'))
      .where('company_id', auth.company_id)
      .first();

    return generateNo(prefix, data?.max_no);
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

  async cancelWo(id: number, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    await wo.$query().patch({
      status: 'cancel',
      progress: 'cancel',
    });
  }

  async updateServiceWo(
    id: number,
    body: WorkOrderUpdateServiceDto,
    auth: IAuth,
  ) {
    const wo = await WorkOrdersModel.query().findOne({
      id: id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    const result = await WorkOrdersModel.transaction(async (trx) => {
      const summary = await this.getServiceList(wo, body, auth, trx);

      const woData = await wo.$query(trx).patch({
        ...summary,
        updated_by: auth.id,
      });

      return woData;
    });

    return {
      message: 'WO Berhasil di update',
      data: result,
    };
  }
  async getServiceList(
    wo: WorkOrdersModel,
    body: WorkOrderUpdateServiceDto,
    auth: IAuth,
    trx?: any,
  ) {
    if (body.services.length > 0) {
      await WorkOrderItemsModel.query(trx)
        .where('type', 'service')
        .where('work_order_id', wo.id)
        .whereRaw(
          `(data->>'id')::int NOT IN (${body.services.map(() => '?').join(',')})`,
          body.services.map((e) => e.id),
        )
        .delete();
    }

    if (body.sparepart.length > 0) {
      await WorkOrderItemsModel.query(trx)
        .where('type', 'sparepart')
        .where('work_order_id', wo.id)
        .whereRaw(
          `(data->>'id')::int NOT IN (${body.sparepart.map(() => '?').join(',')})`,
          body.sparepart.map((e) => e.id),
        )
        .delete();
    }

    const items = await WorkOrderItemsModel.query(trx).where(
      'work_order_id',
      wo.id,
    );

    await this.createOrUpdateWoItem({
      woId: wo.id,
      type: 'service',
      auth,
      data: body.services,
      trx,
      items,
    });

    await this.createOrUpdateWoItem({
      woId: wo.id,
      type: 'sparepart',
      auth,
      data: body.sparepart,
      trx,
      items,
    });

    return await this.getSummary(wo, trx);
  }

  async createOrUpdateWoItem(prop: ICreateOrUpdateWoItem) {
    for (const item of prop.data) {
      const data = prop.items
        .filter((e) => e.type === prop.type)
        .find((e) => e.data.id === item.id);

      const payload: any = {
        price: item.price,
        qty: item.qty,
        supplier_id: item.supplier_id || null,
        total_price:
          Number(item.price) * (item.qty || 0) - Number(data?.disc_value ?? 0),
        updated_by: prop.auth.id,
      };

      if (data) {
        if (prop.type === 'sparepart') {
          const product = await ProductsModel.query(prop.trx).findById(item.id);
          const diff = Number(item.qty) - Number(data.qty);

          if (diff > 0) {
            await product.$query(prop.trx).increment('stock', diff);
          } else if (diff < 0) {
            await product.$query(prop.trx).decrement('stock', Math.abs(diff));
          }
        }
        await data.$query(prop.trx).patch(payload);
      } else {
        const newPayload = {
          ...payload,
          disc_percentage: 0,
          disc_value: 0,
          tax_percentage: 0,
          total_payment: 0,
          type: prop.type,
          updated_by: prop.auth.id,
          work_order_id: prop.woId,
        };
        if (prop.type === 'sparepart') {
          const product = await ProductsModel.query(prop.trx).findById(item.id);

          await product.$query(prop.trx).decrement('stock', item.qty);
          newPayload['data'] = product;
        } else {
          newPayload['data'] = await ServicesModel.query(prop.trx).findById(
            item.id,
          );
        }

        await WorkOrderItemsModel.query(prop.trx).insert(newPayload);
      }
    }
  }

  async sugestion(id: number, body: ChangeSugestionDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    await wo.$query().patch({
      next_sugestion: body.next_sugestion,
    });

    return 'Saran Selanjutnya berhasil disimpan';
  }

  async getSummary(wo: WorkOrdersModel, trx?: any) {
    const summary = await WorkOrderItemsModel.query(trx)
      .select(
        'type',
        raw('SUM(total_price)::FLOAT as subtotal'),
        raw('SUM(total_price * (tax_percentage / 100))::FLOAT').as('tax'),
      )
      .where('work_order_id', wo.id)
      .groupBy('type');

    const result: any = {};

    summary.forEach((item: any) => {
      result[item.type] = {
        subtotal: item.subtotal !== isNaN ? item.subtotal : 0,
        tax: item.tax !== isNaN ? item.tax : 0,
      };
    });

    const service = result?.service?.subtotal || 0;
    const sparepart = result?.sparepart?.subtotal || 0;
    const taxService = result?.service?.tax || 0;
    const taxSparepart = result?.sparepart?.tax || 0;
    const subtotal = service + sparepart;
    const tax = taxService + taxSparepart;

    let parsedPromo: any[] = [];

    if (
      wo.promo_data &&
      typeof wo.promo_data === 'string' &&
      wo.promo_data.trim() !== ''
    ) {
      try {
        parsedPromo = JSON.parse(wo.promo_data);
      } catch (e) {
        console.error('Failed to parse promo_data JSON:', e);
        parsedPromo = [];
      }
    }
    const resPayload = {
      service_total: service,
      sparepart_total: sparepart,
      ppn_amount: tax,
      sub_total: subtotal,
      disc_value: Number(wo.disc_value ?? 0),
      disc_percentage: Number(wo.disc_percentage ?? 0),
      promo_data: parsedPromo,
      grand_total: 0,
    };

    const promos = resPayload.promo_data;
    if (promos.length > 0) {
      const promoIndex = promos.findIndex((e: any) => e.code === 'BIRTHDAY');

      let disc_value = 0;
      let disc_percentage = 0;
      if (promoIndex !== -1) {
        const find = promos[promoIndex];
        if (find.type === 'percentage') {
          const totalP = (subtotal * find.value) / 100;

          if (find.max_discount > 0) {
            disc_value = Math.min(totalP, find.max_discount);
          } else {
            disc_value = totalP;
          }
        } else {
          disc_value = find.value;
        }

        const totalDisc = Math.round(resPayload.disc_value + disc_value);
        if (subtotal > 0) {
          disc_percentage = (totalDisc / subtotal) * 100;
        }

        resPayload.promo_data[promoIndex] = {
          ...find,
          disc_value: disc_value,
          promo_amount: disc_value,
          disc_percentage,
        };

        resPayload.disc_value = totalDisc;
        resPayload.disc_percentage = disc_percentage;
      }
    }

    resPayload.promo_data = JSON.stringify(resPayload.promo_data) as any;

    if (resPayload.disc_value > 0) {
      const items = await WorkOrderItemsModel.query(trx).where(
        'work_order_id',
        wo.id,
      );

      const discRatio = subtotal > 0 ? resPayload.disc_value / subtotal : 0;
      let totalTax = 0;

      items.forEach((item) => {
        const qty = Number(item.qty ?? 0);
        const price = Number(item.price ?? 0);
        const disc = Number(item.disc_value ?? 0);
        const itemAmount = price * qty - disc;

        const taxRate = Number(item.tax_percentage ?? 0) / 100;

        if (taxRate > 0) {
          const itemAllocatedDisc = itemAmount * discRatio;
          const itemNetForTax = itemAmount - itemAllocatedDisc;

          totalTax += itemNetForTax * taxRate;
        }
      });
      resPayload.ppn_amount = totalTax;
    }

    resPayload.grand_total =
      subtotal - resPayload.disc_value + tax + Number(wo.other_fee ?? 0);

    return resPayload;
  }

  async deleteItem(id: number, auth: IAuth) {
    await WorkOrderItemsModel.transaction(async (trx) => {
      const item = await WorkOrderItemsModel.query(trx).findById(id);
      if (item) {
        await item.$query(trx).delete();
        const wo = await WorkOrdersModel.query().findById(item.work_order_id);

        const summary = await this.getSummary(wo, trx);

        await wo.$query(trx).patch({
          ...summary,
          updated_by: auth.id,
        });
      }
    });

    return 'data berhasil di hapus';
  }
}
