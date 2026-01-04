import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, CustomerQueryDto } from './dto/customer.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { sendWelcomeMessage } from 'utils/helpers/send-wa';
import { CompaniesModel } from 'models/companies.model';
import { fn } from 'objection';
import dayjs from 'dayjs';
@Injectable()
export class CustomersService {
  async getStats() {
    const startOfThisMonth = dayjs().startOf('month').toISOString();

    const startOfLastMonth = dayjs()
      .subtract(1, 'month')
      .startOf('month')
      .toISOString();
    const endOfLastMonth = dayjs()
      .subtract(1, 'month')
      .endOf('month')
      .toISOString();

    const totalThisMonth = await CustomersModel.query()
      .where('created_at', '>=', startOfThisMonth)
      .resultSize();

    const totalLastMonth = await CustomersModel.query()
      .whereBetween('created_at', [startOfLastMonth, endOfLastMonth])
      .resultSize();

    let growth = 0;
    if (totalLastMonth > 0) {
      growth = ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100;
    } else {
      growth = totalThisMonth > 0 ? 100 : 0;
    }

    return {
      this_month: totalThisMonth,
      last_month: totalLastMonth,
      growth: Math.round(growth),
      label: `${growth >= 0 ? 'Meningkat' : 'Menurun'} ${Math.abs(Math.round(growth))}% dibandingkan bulan lalu`,
    };
  }
  async listCustomer(query: CustomerQueryDto) {
    const result = await CustomersModel.query()
      .select([
        'customers.*',
        CustomersModel.relatedQuery('vehicles').count().as('total_vehicle'),
      ])
      .withGraphFetched(`[profile, ${query.isVehicle ? 'vehicles' : ''} ]`)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('email', `%${query.q}%`)
            .orWhereILike('phone', `%${query.q}%`);
        }
      })
      .whereNull('deleted_at')
      .page(query.page, query.pageSize);

    let stats = undefined as any;

    if (!query.noStats) {
      stats = await this.getStats();
    }

    return {
      ...result,
      stats,
    };
  }
  async createCustomer(body: CreateCustomerDto, auth: IAuth) {
    if (!body?.id) {
      body.vehicles = body.vehicles.map((item) => ({
        ...item,
        company_id: auth.company_id,
        updated_by: auth.id,
      }));
    }

    body.profile = {
      ...body.profile,
      full_name: body.name,
      phone_number: body.phone,
      join_date: fn.now(),
      updated_by: auth.id,
      model: 'customers',
    } as any;

    const phone = formatPhoneNumber(body.phone);
    await CustomersModel.transaction(async (trx) => {
      await CustomersModel.query(trx).upsertGraph(
        {
          id: body?.id || undefined,
          ...body,
          company_id: auth.company_id,
          updated_by: auth.id,
          phone,
        } as any,
        { relate: ['vehicles'] },
      );
    });

    const company = await CompaniesModel.query().findById(auth.company_id);

    sendWelcomeMessage({
      customerName: body.name,
      vehicleName: `${body.vehicles[0].brand} - ${body.vehicles[0].model}`,
      plateNumber: body.vehicles[0].plate_number,
      workshopName: company?.name || '',
      to: phone,
    });
    return true;
  }

  async detail(id: number) {
    return CustomersModel.query()
      .withGraphFetched('[profile.[province,city,district],vehicles]')
      .findById(id);
  }

  async destroy(id: number, auth: IAuth) {
    const find = await CustomersModel.query().findOne({
      company_id: auth.company_id,
      id,
    });

    if (!find) throw new NotFoundException();

    await find.$query().patch({
      deleted_at: fn.now(),
      updated_by: auth.id,
    });
  }
}
