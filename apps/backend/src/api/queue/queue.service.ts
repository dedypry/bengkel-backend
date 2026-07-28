import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesModel } from 'models/companies.model';
import { QueueCategoriesModel } from 'models/queue-categories.model';
import { QueuesModel } from 'models/queues.model';
import dayjs from 'utils/helpers/dayjs';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PusherService } from '../notifications/pusher.service';
import {
  QUEUE_STATUS,
  QueueCategoryDto,
  QueueQueryDto,
  UpdateQueueStatusDto,
} from './dto/queue.dto';

const TZ = 'Asia/Jakarta';
const DEFAULT_SHOP_NAME = 'BENGKEL MAJU JAYA';

@Injectable()
export class QueueService {
  constructor(private readonly pusherService: PusherService) {}
  async categories(companyId: number) {
    return await QueueCategoriesModel.query()
      .where('company_id', companyId)
      .whereNull('deleted_at')
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async upsertCategory(dto: QueueCategoryDto, auth: IAuth) {
    const payload = {
      company_id: auth.company_id,
      code: dto.code.toUpperCase(),
      name: dto.name,
      prefix_code: dto.prefix_code.toUpperCase(),
      estimated_minutes: dto.estimated_minutes ?? 0,
      sort_order: dto.sort_order ?? 0,
      is_active: dto.is_active ?? true,
      updated_by: auth.id,
    };

    if (dto.id) {
      const category = await QueueCategoriesModel.query()
        .findById(dto.id)
        .where('company_id', auth.company_id)
        .whereNull('deleted_at');

      if (!category)
        throw new NotFoundException('Kategori antrean tidak ditemukan');

      return await category.$query().patchAndFetch(payload as any);
    }

    return await QueueCategoriesModel.query().insertAndFetch(payload as any);
  }

  async generate(categoryId: number, companyId: number) {
    const result = await QueueCategoriesModel.transaction(async (trx) => {
      const today = dayjs().tz(TZ).format('YYYY-MM-DD');
      const [category, company] = await Promise.all([
        QueueCategoriesModel.query(trx)
          .where('id', categoryId)
          .where('company_id', companyId)
          .where('is_active', true)
          .whereNull('deleted_at')
          .forUpdate()
          .first(),
        CompaniesModel.query(trx).findById(companyId).select('name'),
      ]);

      if (!category)
        throw new NotFoundException('Kategori antrean tidak ditemukan');

      const lastResetToday = this.isSameQueueDate(
        category.last_reset_date,
        today,
      );
      let currentNumber = lastResetToday
        ? Number(category.current_number) || 0
        : 0;

      const maxRow = (await QueuesModel.query(trx)
        .where('company_id', companyId)
        .where('category_id', category.id)
        .where('queue_date', today)
        .max('sequence as max_sequence')
        .first()) as { max_sequence?: string | number | null };

      const maxSequence = Number(maxRow?.max_sequence) || 0;
      currentNumber = Math.max(currentNumber, maxSequence);
      const sequence = currentNumber + 1;
      const queueNumber = `${category.prefix_code}-${sequence
        .toString()
        .padStart(3, '0')}`;

      await category.$query(trx).patch({
        current_number: sequence,
        last_reset_date: today,
      } as any);

      const queue = await QueuesModel.query(trx).insertAndFetch({
        company_id: companyId,
        category_id: category.id,
        queue_number: queueNumber,
        queue_date: today,
        sequence,
        status: QUEUE_STATUS.WAITING,
      } as any);

      return {
        queue,
        category,
        ticket_text: this.formatTicket(
          queueNumber,
          category.name,
          company?.name,
        ),
      };
    });

    await this.broadcastQueueUpdate(companyId, 'generated');

    return result;
  }

  async list(auth: IAuth, query: QueueQueryDto) {
    const date = query.date || dayjs().tz(TZ).format('YYYY-MM-DD');

    return await QueuesModel.query()
      .withGraphFetched('[category,attendant]')
      .where('company_id', auth.company_id)
      .where('queue_date', date)
      .modify((builder) => {
        if (query.status) builder.where('status', query.status);
        if (query.q) builder.whereILike('queue_number', `%${query.q}%`);
      })
      .orderBy('created_at', 'desc')
      .page(query.page, query.pageSize);
  }

  async next(auth: IAuth, counterNumber?: string) {
    const today = dayjs().tz(TZ).format('YYYY-MM-DD');
    const queue = await QueuesModel.query()
      .withGraphFetched('category')
      .where('company_id', auth.company_id)
      .where('queue_date', today)
      .where('status', QUEUE_STATUS.WAITING)
      .orderBy('created_at', 'asc')
      .first();

    if (!queue) throw new NotFoundException('Tidak ada antrean menunggu');

    const updated = await queue.$query().patchAndFetch({
      status: QUEUE_STATUS.CALLING,
      attendant_id: auth.id,
      counter_number: counterNumber,
      called_at: new Date().toISOString(),
      updated_by: auth.id,
    } as any);

    await this.broadcastQueueUpdate(auth.company_id, 'called', {
      queue_number: updated.queue_number,
      counter_number: updated.counter_number ?? counterNumber ?? null,
      category_name: queue.category?.name,
    });

    return updated;
  }

  async updateStatus(dto: UpdateQueueStatusDto, auth: IAuth) {
    const queue = await QueuesModel.query()
      .findById(dto.id)
      .where('company_id', auth.company_id);

    if (!queue) throw new NotFoundException('Antrean tidak ditemukan');

    if ([QUEUE_STATUS.DONE, QUEUE_STATUS.SKIP].includes(queue.status as any)) {
      throw new BadRequestException('Antrean sudah selesai atau dilewati');
    }

    const payload: Record<string, any> = {
      status: dto.status,
      updated_by: auth.id,
    };

    if (dto.counter_number) payload.counter_number = dto.counter_number;
    if (dto.work_order_id) payload.work_order_id = dto.work_order_id;
    if (dto.status === QUEUE_STATUS.CALLING) {
      payload.called_at = queue.called_at || new Date().toISOString();
      payload.attendant_id = queue.attendant_id || auth.id;
    }
    if (dto.status === QUEUE_STATUS.PROCESSING) {
      payload.started_at = queue.started_at || new Date().toISOString();
    }
    if (dto.status === QUEUE_STATUS.DONE) {
      payload.done_at = queue.done_at || new Date().toISOString();
    }

    const updated = await queue.$query().patchAndFetch(payload);

    if (dto.status === QUEUE_STATUS.CALLING) {
      const withCategory = await QueuesModel.query()
        .findById(updated.id)
        .withGraphFetched('category');

      await this.broadcastQueueUpdate(auth.company_id, 'called', {
        queue_number: withCategory?.queue_number,
        counter_number: withCategory?.counter_number ?? null,
        category_name: withCategory?.category?.name,
      });
    } else {
      await this.broadcastQueueUpdate(auth.company_id, 'status_updated');
    }

    return updated;
  }

  async display(companyId: number) {
    const today = dayjs().tz(TZ).format('YYYY-MM-DD');
    const [company, calling, waiting, totalWaitingResult] = await Promise.all([
      CompaniesModel.query().findById(companyId).select('id', 'name'),
      QueuesModel.query()
        .withGraphFetched('category')
        .where('company_id', companyId)
        .where('queue_date', today)
        .whereIn('status', [QUEUE_STATUS.CALLING, QUEUE_STATUS.PROCESSING])
        .orderBy('called_at', 'desc')
        .limit(8),
      QueuesModel.query()
        .withGraphFetched('category')
        .where('company_id', companyId)
        .where('queue_date', today)
        .where('status', QUEUE_STATUS.WAITING)
        .orderBy('created_at', 'asc')
        .limit(10),
      QueuesModel.query()
        .where('company_id', companyId)
        .where('queue_date', today)
        .where('status', QUEUE_STATUS.WAITING)
        .count()
        .first() as any,
    ]);

    return {
      date: today,
      company_name: company?.name || DEFAULT_SHOP_NAME,
      calling,
      waiting,
      total_waiting: Number(totalWaitingResult?.count || 0) || 0,
    };
  }

  async resetDaily(companyId?: number) {
    const today = dayjs().tz(TZ).format('YYYY-MM-DD');

    await QueueCategoriesModel.query()
      .patch({
        current_number: 0,
        last_reset_date: today,
      } as any)
      .modify((builder) => {
        if (companyId) builder.where('company_id', companyId);
      });
  }

  private isSameQueueDate(
    dateValue: string | Date | null | undefined,
    today: string,
  ) {
    if (!dateValue) {
      return false;
    }

    return dayjs(dateValue).tz(TZ).format('YYYY-MM-DD') === today;
  }

  private async broadcastQueueUpdate(
    companyId: number,
    action: string,
    meta: Record<string, unknown> = {},
  ) {
    try {
      await this.pusherService.notifyCompanyQueue(companyId, 'queue.updated', {
        action,
        company_id: companyId,
        updated_at: new Date().toISOString(),
        ...meta,
      });
    } catch (error) {
      console.error('Pusher queue broadcast failed:', error);
    }
  }

  formatTicket(
    queueNumber: string,
    categoryName: string,
    shopName = DEFAULT_SHOP_NAME,
  ) {
    const width = 43;
    const line = '-'.repeat(width);
    const center = (text: string) => {
      const pad = Math.max(0, Math.floor((width - text.length) / 2));
      return `${' '.repeat(pad)}${text}`;
    };
    const now = dayjs().tz(TZ).format('DD/MM/YYYY HH:mm');

    return [
      line,
      center(shopName),
      line,
      center('NOMOR ANTREAN'),
      center(queueNumber),
      '',
      `    Kategori: ${categoryName}`,
      `    Tanggal : ${now}`,
      '',
      center('Silahkan tunggu nomor Anda'),
      center('dipanggil.'),
      center('Terima kasih atas kunjungannya'),
      line,
    ].join('\n');
  }
}
