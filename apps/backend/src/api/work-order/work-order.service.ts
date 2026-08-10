import {
  Body,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CancelDto,
  ChangeSugestionDto,
  ComplainWorkOrderDto,
  ListPaymentQueryDto,
  MechanicRatting,
  UpdateMechanicWoDto,
  UpdateOrderDateDto,
  UpdatePicSaDto,
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
import dayjs, { resolveWorkOrderCreatedAt } from 'utils/helpers/dayjs';
import { PromosModel } from 'models/promos.model';
import { MechanicRatingsModel } from 'models/mechanic-ratings.model';
import { WorkOrderItemsModel } from 'models/work-order-items.model';
import { BookingsModel } from 'models/bookings.model';
import { SettingsModel } from 'models/settings.model';
import { VehicleMasterModel } from 'models/vehicle-master.model';
import { UsersModel } from 'models/users.model';
import { CustomerEmailService } from 'utils/services/customer-email.service';
import { PusherService } from '../notifications/pusher.service';

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
  constructor(
    private readonly customerEmailService: CustomerEmailService,
    private readonly pusherService: PusherService,
  ) {}

  private normalizeMechanicIds(value?: number[] | string | number) {
    if (value == null || value === '') {
      return [] as number[];
    }

    if (Array.isArray(value)) {
      return value.map((id) => Number(id)).filter((id) => id > 0);
    }

    if (typeof value === 'string') {
      return value
        .split(',')
        .map((id) => Number(id.trim()))
        .filter((id) => id > 0);
    }

    const id = Number(value);

    return id > 0 ? [id] : [];
  }

  async getMechanicFilterOptions(auth: IAuth) {
    const rows = await UsersModel.query()
      .distinct('users.id', 'users.name')
      .select('users.id', 'users.name')
      .join('mechanic_work as mw', 'mw.mechanic_id', 'users.id')
      .join('work_orders as wo', 'wo.id', 'mw.work_order_id')
      .where('wo.company_id', auth.company_id)
      .whereNotNull('users.name')
      .orderBy('users.name', 'asc');

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
    }));
  }

  async list(query: WoQuery, auth: IAuth) {
    const mechanicIds = this.normalizeMechanicIds(query.mechanic_ids);

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
          if (query.status === 'active') {
            // On Progress: semua yang belum selesai / batal
            builder.whereNotIn('progress', ['finish', 'cancel']);
          } else if (query.status === 'finish') {
            builder.where('progress', 'finish');
          } else if (query.status === 'cancel') {
            builder.where('progress', 'cancel');
          } else if (
            ['pick_up', 'queue', 'on_progress', 'ready'].includes(query.status)
          ) {
            builder.where('progress', query.status);
          } else {
            builder
              .where('progress', query.status)
              .orWhere('wo.status', query.status);
          }
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

        if (mechanicIds.length > 0) {
          builder.whereExists(
            WorkOrdersModel.relatedQuery('mechanics').whereIn(
              'mechanics.id',
              mechanicIds,
            ),
          );
        }
      })
      .where((builder) => {
        if (query.date_from) {
          builder.whereRaw('DATE(wo.created_at) >= ?', [
            dayjs(query.date_from).format('YYYY-MM-DD'),
          ]);
        }
        if (query.date_to) {
          builder.whereRaw('DATE(wo.created_at) <= ?', [
            dayjs(query.date_to).format('YYYY-MM-DD'),
          ]);
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
      .alias('wo')
      .where('wo.company_id', auth.company_id)
      .where((builder) => {
        if (query.date_from) {
          builder.whereRaw('DATE(wo.created_at) >= ?', [
            dayjs(query.date_from).format('YYYY-MM-DD'),
          ]);
        }
        if (query.date_to) {
          builder.whereRaw('DATE(wo.created_at) <= ?', [
            dayjs(query.date_to).format('YYYY-MM-DD'),
          ]);
        }
        if (query.date && !query.date_from && !query.date_to) {
          builder.whereRaw('DATE(wo.created_at) = ?', [query.date]);
        }
      })
      .select(
        raw('count(*)::INTEGER as total'),
        raw(
          "count(*) filter (where progress = 'pick_up')::INTEGER as waiting_queue",
        ),
        raw("count(*) filter (where progress = 'queue')::INTEGER as waiting"),
        raw(
          "count(*) filter (where progress = 'on_progress')::INTEGER as processing",
        ),
        raw("count(*) filter (where progress = 'ready')::INTEGER as ready"),
        raw(
          "count(*) filter (where progress = 'finish')::INTEGER as completed",
        ),
        raw(
          "count(*) filter (where progress = 'cancel')::INTEGER as cancelled",
        ),
      )
      .first();

    return {
      results,
      total: data.total,
      stats: {
        total: Number(stats?.total || 0),
        waiting_queue: Number(stats?.waiting_queue || 0),
        waiting: Number(stats?.waiting || 0),
        processing: Number(stats?.processing || 0),
        ready: Number(stats?.ready || 0),
        completed: Number(stats?.completed || 0),
        cancelled: Number(stats?.cancelled || 0),
      },
    };
  }

  async displayForTv(companyId: number) {
    const today = dayjs().format('YYYY-MM-DD');

    const company = await CompaniesModel.query()
      .findById(companyId)
      .select('id', 'name');

    const orders = await WorkOrdersModel.query()
      .alias('wo')
      .joinRelated('[vehicle, customer]')
      .withGraphFetched('[vehicle, customer]')
      .where('wo.company_id', companyId)
      .whereNotIn('wo.progress', ['finish', 'cancel'])
      .whereRaw('DATE(wo.created_at) = ?', [today])
      .orderByRaw(
        `CASE wo.progress
          WHEN 'ready' THEN 1
          WHEN 'on_progress' THEN 2
          WHEN 'queue' THEN 3
          WHEN 'pick_up' THEN 4
          ELSE 5
        END`,
      )
      .orderBy('wo.updated_at', 'desc')
      .limit(24);

    const statsRow: any = await WorkOrdersModel.query()
      .where('company_id', companyId)
      .whereRaw('DATE(created_at) = ?', [today])
      .whereNotIn('progress', ['finish', 'cancel'])
      .select(
        raw(
          "count(*) filter (where progress in ('queue', 'pick_up')) as waiting",
        ),
        raw("count(*) filter (where progress = 'on_progress') as processing"),
        raw("count(*) filter (where progress = 'ready') as ready"),
      )
      .first();

    const mapped = orders.map((wo) => this.mapDisplayOrder(wo));
    const featured =
      mapped.find((item) => item.progress === 'ready') ||
      mapped.find((item) => item.progress === 'on_progress') ||
      mapped[0] ||
      null;

    return {
      date: today,
      company_name: company?.name || 'Bengkel',
      stats: {
        waiting: Number(statsRow?.waiting) || 0,
        processing: Number(statsRow?.processing) || 0,
        ready: Number(statsRow?.ready) || 0,
        total: mapped.length,
      },
      featured,
      orders: mapped,
    };
  }

  private mapDisplayOrder(wo: WorkOrdersModel) {
    const progress =
      wo.progress === 'pick_up' ? 'queue' : (wo.progress as string);

    return {
      id: wo.id,
      queue_no: wo.queue_no || wo.trx_no,
      trx_no: wo.trx_no,
      plate_number: wo.vehicle?.plate_number,
      vehicle_name: [wo.vehicle?.brand, wo.vehicle?.model]
        .filter(Boolean)
        .join(' '),
      progress,
      start_at: wo.start_at,
      end_at: wo.end_at,
      updated_at: wo.updated_at,
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
          birth_date: body?.customer?.birth_date || null,
        },
      } as any;

      if (body.vehicle.model && body.vehicle.brand) {
        const type = body.vehicle.model.toUpperCase();
        const merk = body.vehicle.brand.toUpperCase();

        const vehicle = await VehicleMasterModel.query(trx)
          .where('type', type)
          .where('merk', merk)
          .first();

        if (!vehicle) {
          await VehicleMasterModel.query(trx).insert({
            merk,
            type,
            cc: body.vehicle.engine_capacity,
          });
        }
      }

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
        remind_next_service: !!body.remind_next_service,
        ...(!body.id && {
          created_at: resolveWorkOrderCreatedAt(body.created_at),
        }),
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

    void this.broadcastServiceUpdate(result.id, auth.company_id, 'created', {
      progress: result.progress,
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
      .withGraphFetched('[mechanics, vehicle, customer]')
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

    if (body.progress === 'ready') {
      void this.customerEmailService.notifyWoReady(id, auth.company_id);
      void this.broadcastCashierCall(wo, auth.company_id);
    }

    void this.broadcastServiceUpdate(wo.id, auth.company_id, 'status_updated', {
      progress: body.progress,
    });
  }

  async callCashier(id: number, auth: IAuth) {
    const wo = await WorkOrdersModel.query()
      .withGraphFetched('[vehicle, customer]')
      .findOne({
        id,
        company_id: auth.company_id,
      });

    if (!wo) throw new NotFoundException();

    if (wo.progress !== 'ready') {
      throw new BadRequestException(
        'Panggilan kasir hanya untuk unit dengan status siap bayar',
      );
    }

    await this.broadcastCashierCall(wo, auth.company_id);

    return { message: 'Panggilan ke kasir berhasil dikirim' };
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

  private async broadcastCashierCall(wo: WorkOrdersModel, companyId: number) {
    try {
      await this.pusherService.notifyCompanyService(companyId, 'cashier.call', {
        action: 'called',
        company_id: companyId,
        work_order_id: wo.id,
        plate_number: wo.vehicle?.plate_number,
        queue_no: wo.queue_no,
        trx_no: wo.trx_no,
        customer_name: wo.customer?.name,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Pusher cashier call broadcast failed:', error);
    }
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
    }).then((result) => {
      void this.broadcastServiceUpdate(id, auth.company_id, 'mechanic_updated');
      return result;
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

  async cancelWo(id: number, body: CancelDto, auth: IAuth) {
    await WorkOrdersModel.transaction(async (trx) => {
      const wo = await WorkOrdersModel.query(trx).findOne({
        id,
        company_id: auth.company_id,
      });

      if (!wo) throw new NotFoundException();

      const spareparts = await WorkOrderItemsModel.query(trx)
        .where('work_order_id', wo.id)
        .where('type', 'sparepart');

      for (const item of spareparts) {
        const product = await ProductsModel.query(trx).findById(item.data.id);

        if (product) {
          await product.$query(trx).increment('stock', item.qty);
        }
      }

      await wo.$query(trx).patch({
        status: 'cancel',
        progress: 'cancel',
        cancel_note: body.cancelNote,
        updated_by: auth.id,
      });
    });

    void this.broadcastServiceUpdate(id, auth.company_id, 'status_updated', {
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
        ...(wo.status === 'closed' && {
          status: 'queue',
          progress: 'ready',
        }),
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

  async updateComplaint(id: number, body: ComplainWorkOrderDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    await wo.$query().patch({
      complaints: body.complaints,
      updated_by: auth.id,
    });

    return 'Komplain berhasil diubah';
  }

  async updatePicAndSa(id: number, body: UpdatePicSaDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    await wo.$query().patch({
      ...(body.pic_id !== undefined && {
        pic_id: body.pic_id,
      }),
      ...(body.sa_id !== undefined && {
        sa_id: body.sa_id,
      }),
      updated_by: auth.id,
    });

    return 'PIC dan SA berhasil diubah';
  }

  async updateOrderDate(id: number, body: UpdateOrderDateDto, auth: IAuth) {
    const wo = await WorkOrdersModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!wo) throw new NotFoundException();

    if (wo.progress === 'finish') {
      throw new BadRequestException(
        'Tanggal order tidak dapat diubah setelah finish',
      );
    }

    await wo.$query().patch({
      created_at: resolveWorkOrderCreatedAt(body.created_at),
      updated_by: auth.id,
    });

    return { message: 'Tanggal order berhasil diubah' };
  }
}
