import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, CustomerQueryDto } from './dto/customer.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { CompaniesModel } from 'models/companies.model';
import { fn, raw } from 'objection';
import dayjs from 'dayjs';
import { ServicesModel } from 'models/services.model';
import { VehiclesModel } from 'models/vehicles.model';
import { IQuery } from 'utils/interfaces/query';
import { CustomerVehicleModel } from 'models/customer-vehicle.model';
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
  async listNoPagination(query: IQuery) {
    return await CustomersModel.query()
      .withGraphFetched('[profile]')
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('email', `%${query.q}%`)
            .orWhereILike('nik', `%${query.q}%`);
        }
      });
  }
  async listCustomer(query: CustomerQueryDto) {
    console.log('QUERY', query);
    const queryData = CustomersModel.query()
      .select([
        'customers.*',
        CustomersModel.relatedQuery('vehicles').count().as('total_vehicle'),
      ])
      .withGraphFetched(`[profile, ${query.isVehicle == 1 ? 'vehicles' : ''} ]`)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('name', `%${query.q}%`)
            .orWhereILike('email', `%${query.q}%`)
            .orWhereILike('phone', `%${query.q}%`)
            .orWhereExists(
              CustomersModel.relatedQuery('vehicles').where((v) => {
                v.whereILike('plate_number', `%${query.q}%`)
                  .orWhereILike('brand', `%${query.q}%`)
                  .orWhereILike('model', `%${query.q}%`)
                  .orWhereILike('engine_number', `%${query.q}%`)
                  .orWhereILike('vin_number', `%${query.q}%`);
              }),
            );
        }

        if (query.status && query.status != 'all') {
          builder.where('status', query.status);
        }
      })
      .where((builder) => {
        if (query.brand || query.model) {
          builder.whereExists(
            CustomersModel.relatedQuery('vehicles').modify((vehicleBuilder) => {
              if (query.brand) {
                vehicleBuilder.whereILike(
                  raw('LOWER(brand)'),
                  query.brand?.toLowerCase(),
                );
              }
              if (query.model) {
                vehicleBuilder.whereILike(
                  raw('LOWER(model)'),
                  query.model?.toLowerCase(),
                );
              }
            }),
          );
        }
      })
      .whereNull('customers.deleted_at')
      .orderBy('id', 'ASC');

    if (query.noPagination) {
      return await queryData;
    }

    const vehicles = await VehiclesModel.query()
      .select(
        raw('LOWER(TRIM(brand)) as brand'), // Gunakan alias yang unik
        raw('LOWER(TRIM(model)) as model'),
      )
      .whereNull('deleted_at')
      .groupBy([raw('LOWER(TRIM(brand))'), raw('LOWER(TRIM(model))')])
      .orderBy(raw('LOWER(TRIM(brand))'), 'asc'); // Order berdasarkan fungsi yang sama

    let stats = undefined as any;

    const result = await queryData.page(query.page, query.pageSize);
    if (!query.noStats) {
      stats = await this.getStats();
    }

    stats['vehicles'] = vehicles;
    return {
      ...result,
      stats,
    };
  }
  async createCustomer(body: CreateCustomerDto, auth: IAuth) {
    if (!body?.id && body.vehicles.length) {
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
    return await CustomersModel.transaction(async (trx) => {
      return await CustomersModel.query(trx).upsertGraphAndFetch(
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

  async listService() {
    return await ServicesModel.query();
  }

  async listBrand() {
    return await CompaniesModel.query()
      .withGraphFetched('address')
      .whereNull('deleted_at');
  }

  async createFromImport(row: any, auth: IAuth) {
    const phoneNumber = formatPhoneNumber(row.I);
    let [vehicle, customer] = await Promise.all([
      VehiclesModel.query().findOne('plate_number', row.A),
      CustomersModel.query().findOne('phone', phoneNumber),
    ]);
    // ROW {
    //   A: 'Z 1743 ME',
    //   B: 'OM JAJANG',
    //   C: 'BENGKEL AUTOHERO TASIK',
    //   D: 'TASIKMALAYA',
    //   E: 'TASIKMALAYA',
    //   F: 'TASIKMALAYA',
    //   G: 'JAWA BARAT',
    //   H: null,
    //   I: "'085282571421",
    //   J: 'CRZ',
    //   K: 'HITAM',
    //   L: 2013,
    //   M: 'JHMZF1422DS300196',
    //   N: 'ZF1',
    //   O: 'CUS00002'
    // }
    const payloadVehile = {
      plate_number: row.A,
      brand: '',
      model: row.J,
      year: row.L,
      vin_number: row.M,
      engine_number: row.N,
    };

    const payloadCustomer: any = {
      name: row.B,
      phone: phoneNumber,
      email: '',
      customer_type: 'personal',
      nik_ktp: '',
      credit_limit: 0,
      notes: '',
      company_id: auth.company_id,
      updated_by: auth.id,
      group: row.O,
      profile: {
        full_name: row.B,
        phone_number: phoneNumber,
        email: row.O,
        model: 'customers',
        province_name: row.G,
        city_name: row.F,
        district_name: row.E,
        subdistrict_name: row.D,
        address: row.C,
      },
    };

    if (vehicle) {
      await vehicle.$query().patch(payloadVehile);
    } else {
      vehicle = await VehiclesModel.query().insert(payloadVehile);
    }

    if (customer) {
      await customer.$query().patch(payloadCustomer);
    } else {
      customer = await CustomersModel.query().insert(payloadCustomer);
    }

    const vehCust = await CustomerVehicleModel.query().findOne({
      customer_id: customer.id,
      vehicle_id: vehicle.id,
    });

    if (!vehCust) {
      await CustomerVehicleModel.query().insert({
        customer_id: customer.id,
        vehicle_id: vehicle.id,
      });
    }
    console.log('ROW', row);
  }
}
