import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueueCategoriesModel } from 'models/queue-categories.model';
import { QueuesModel } from 'models/queues.model';
import dayjs from 'utils/helpers/dayjs';
import type { IAuth } from 'utils/interfaces/IAuth';
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

      if (!category) throw new NotFoundException('Kategori antrean tidak ditemukan');

      return await category.$query().patchAndFetch(payload as any);
    }

    return await QueueCategoriesModel.query().insertAndFetch(payload as any);
  }

  async generate(categoryId: number, companyId: number) {
    return await QueueCategoriesModel.transaction(async (trx) => {
      const today = dayjs().tz(TZ).format('YYYY-MM-DD');
      const category = await QueueCategoriesModel.query(trx)
        .where('id', categoryId)
        .where('company_id', companyId)
        .where('is_active', true)
        .whereNull('deleted_at')
        .forUpdate()
        .first();

      if (!category) throw new NotFoundException('Kategori antrean tidak ditemukan');

      const currentNumber =
        category.last_reset_date === today ? Number(category.current_number) || 0 : 0;
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
        ticket_text: this.formatTicket(queueNumber, category.name),
      };
    });
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

    return await queue.$query().patchAndFetch({
      status: QUEUE_STATUS.CALLING,
      attendant_id: auth.id,
      counter_number: counterNumber,
      called_at: new Date().toISOString(),
      updated_by: auth.id,
    } as any);
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

    return await queue.$query().patchAndFetch(payload);
  }

  async display(companyId: number) {
    const today = dayjs().tz(TZ).format('YYYY-MM-DD');
    const calling = await QueuesModel.query()
      .withGraphFetched('category')
      .where('company_id', companyId)
      .where('queue_date', today)
      .whereIn('status', [QUEUE_STATUS.CALLING, QUEUE_STATUS.PROCESSING])
      .orderBy('called_at', 'desc')
      .limit(8);

    const waiting = await QueuesModel.query()
      .withGraphFetched('category')
      .where('company_id', companyId)
      .where('queue_date', today)
      .where('status', QUEUE_STATUS.WAITING)
      .orderBy('created_at', 'asc')
      .limit(10);

    const [{ count: totalWaiting }]: any = await QueuesModel.query()
      .where('company_id', companyId)
      .where('queue_date', today)
      .where('status', QUEUE_STATUS.WAITING)
      .count();

    return {
      date: today,
      calling,
      waiting,
      total_waiting: Number(totalWaiting) || 0,
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
