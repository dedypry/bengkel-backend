import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  CustomerQueryDto,
  CustomerServiceHistoryQueryDto,
} from './dto/customer.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { formatNumber } from 'utils/helpers/global';
import { CompaniesModel } from 'models/companies.model';
import { fn, raw } from 'objection';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { ServicesModel } from 'models/services.model';
import { VehiclesModel } from 'models/vehicles.model';
import { IQuery } from 'utils/interfaces/query';
import { CustomerVehicleModel } from 'models/customer-vehicle.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import type { Response } from 'express';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import GeneratePDF from 'utils/services/pdf-make.service';
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

  async exportServiceHistoryPdf(
    id: number,
    query: CustomerServiceHistoryQueryDto,
    auth: IAuth,
    res: Response,
  ) {
    const customer = await CustomersModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!customer) throw new NotFoundException();

    const orders = await WorkOrdersModel.query()
      .alias('wo')
      .joinRelated('[vehicle, customer]')
      .withGraphFetched('[services,mechanics,vehicle,customer]')
      .where('customer_id', id)
      .where('wo.company_id', auth.company_id)
      .whereIn('wo.status', ['closed', 'cancel'])
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('trx_no', `%${query.q}%`)
            .orWhereILike('vehicle.plate_number', `%${query.q}%`);
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
      })
      .orderBy('wo.created_at', 'desc');

    const periodLabel = (() => {
      if (query.date_from && query.date_to) {
        return `${dayjs(query.date_from).locale('id').format('DD MMM YYYY')} - ${dayjs(query.date_to).locale('id').format('DD MMM YYYY')}`;
      }
      if (query.date_from) {
        return `Dari ${dayjs(query.date_from).locale('id').format('DD MMM YYYY')}`;
      }
      if (query.date_to) {
        return `Sampai ${dayjs(query.date_to).locale('id').format('DD MMM YYYY')}`;
      }
      return 'Semua tanggal';
    })();

    const tableBody = [
      [
        { text: 'No', style: 'tableHeader' },
        { text: 'Tanggal', style: 'tableHeader' },
        { text: 'No. Transaksi', style: 'tableHeader' },
        { text: 'Kendaraan', style: 'tableHeader' },
        { text: 'Layanan', style: 'tableHeader' },
        { text: 'Mekanik', style: 'tableHeader' },
        { text: 'Total', style: 'tableHeader' },
        { text: 'Status', style: 'tableHeader' },
      ],
      ...orders.map((item, index) => {
        const services = (item.services || [])
          .map((service: any) => service?.data?.name)
          .filter(Boolean)
          .join(', ');
        const mechanics = (item.mechanics || [])
          .map((mechanic: any) => mechanic?.name)
          .filter(Boolean)
          .join(', ');
        const vehicle =
          `${item.vehicle?.plate_number || '-'} (${item.vehicle?.brand || ''} ${item.vehicle?.model || ''})`.trim();

        return [
          String(index + 1),
          dayjs(item.created_at).locale('id').format('DD MMM YYYY'),
          item.trx_no || '-',
          vehicle,
          services || '-',
          mechanics || '-',
          `Rp ${formatNumber(item.grand_total || 0)}`,
          item.status === 'closed' ? 'Sukses' : 'Batal',
        ];
      }),
    ];

    const content: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      pageMargins: [28, 28, 28, 28],
      content: [
        {
          text: 'Riwayat Servis Pelanggan',
          style: 'title',
          margin: [0, 0, 0, 4],
        },
        {
          text: customer.name,
          style: 'customerName',
          margin: [0, 0, 0, 2],
        },
        {
          text: `Telepon: ${customer.phone || '-'}  |  Periode: ${periodLabel}`,
          style: 'subtitle',
          margin: [0, 0, 0, 12],
        },
        {
          table: {
            headerRows: 1,
            widths: [22, 58, 72, '*', '*', 68, 62, 42],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex: number) =>
              rowIndex === 0
                ? '#eef2ff'
                : rowIndex % 2 === 0
                  ? '#f8fafc'
                  : null,
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => '#e2e8f0',
            vLineColor: () => '#e2e8f0',
          },
        },
      ],
      defaultStyle: {
        font: 'Poppins',
        fontSize: 8,
      },
      styles: {
        title: { fontSize: 14, bold: true },
        customerName: { fontSize: 11, bold: true, color: '#334155' },
        subtitle: { fontSize: 9, color: '#64748b' },
        tableHeader: { bold: true, fillColor: '#eef2ff' },
      },
    };

    const fileName = `riwayat-servis-${customer.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')}`;

    return GeneratePDF.make(res).download(content, fileName);
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
