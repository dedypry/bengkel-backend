import { Injectable } from '@nestjs/common';
import { BookingsModel } from 'models/bookings.model';
import { CreateBookingDto } from './dto/bookings.dto';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class BookingsService {
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
}
