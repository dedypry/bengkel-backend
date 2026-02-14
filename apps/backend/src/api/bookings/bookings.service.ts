import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsModel } from 'models/bookings.model';
import { CreateBookingDto, CreateBookingLandingDto } from './dto/bookings.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';
import { fn } from 'objection';
import { CustomersModel } from 'models/customers.model';
import { VehiclesModel } from 'models/vehicles.model';

@Injectable()
export class BookingsService {
  async list(query: IQuery, auth: IAuth) {
    return await BookingsModel.query()
      .withGraphFetched('[vehicle,customer]')
      .where((builder) => {
        if (auth.type === 'cs') {
          builder.where('customer_id', auth.id);
        } else {
          builder.where('branch_id', auth.company_id);
        }
      })
      .orderBy('id', 'desc')
      .page(query.page, query.pageSize);
  }

  async detail(id: number) {
    return await BookingsModel.query()
      .withGraphFetched('[vehicle,customer.profile]')
      .findById(id);
  }

  async create(data: CreateBookingDto, auth: IAuth) {
    const payload: any = {
      ...data,
      customer_id: auth.id,
      updated_by: auth.id,
    };

    if (auth.type != 'cs') {
      payload.customer_id = data.customer_id;
    }

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

  async createFromLanding(body: CreateBookingLandingDto) {
    await CustomersModel.transaction(async (trx) => {
      let customer = await CustomersModel.query(trx)
        .where('email', body.email)
        .orWhere('phone', body.phone)
        .where('name', body.name)
        .first();

      if (!customer) {
        customer = await CustomersModel.query(trx).insertGraph({
          name: body.name,
          email: body.email,
          phone: body.phone,
          profile: {
            phone_number: body.phone,
            full_name: body.name,
            model: 'customers',
          },
        });
      }

      let vehicle = await VehiclesModel.query(trx)
        .where('plate_number', body.plate_number)
        .first();

      if (!vehicle) {
        vehicle = await VehiclesModel.query(trx).insert({
          plate_number: body.plate_number,
          model: body.vehicle_type,
        });
      }

      await BookingsModel.query(trx).insert({
        customer_id: customer.id,
        vehicle_id: vehicle.id,
        created_by: customer.id,
        updated_by: customer.id,
        branch_id: body.branch_id,
        booking_date: body.booking_date,
        booking_time: body.booking_time,
        service_type: body.service_type,
        complaint: body.complaint,
      } as any);
    });

    return 'Booking berhasil disimpan';
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
