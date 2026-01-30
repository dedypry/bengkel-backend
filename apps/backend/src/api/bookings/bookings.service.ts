import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsModel } from 'models/bookings.model';
import { CreateBookingDto } from './dto/bookings.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';
import { fn } from 'objection';

@Injectable()
export class BookingsService {
  async list(query: IQuery, auth: IAuth) {
    return await BookingsModel.query()
      .withGraphFetched('[vehicle]')
      .where('customer_id', auth.id)
      .page(query.page, query.pageSize);
  }

  async create(data: CreateBookingDto, auth: IAuth) {
    const payload: any = {
      ...data,
      customer_id: auth.id,
      updated_by: auth.id,
    };

    if (data?.id) {
      await BookingsModel.query()
        .findById(data?.id)
        .update(payload as any);
    } else {
      payload['created_by'] = auth.id;
      await BookingsModel.query().insert(payload as any);
    }

    return 'data berhasil disimpan';
  }

  async destroy(id: number, auth: IAuth) {
    const booking = await BookingsModel.query().findOne({
      id,
      ...(auth.type === 'cs' && {
        customer_id: auth.id,
      }),
    });

    if (!booking) throw new NotFoundException();

    await booking.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });

    return 'booking berhasil dibatalkan';
  }
}
