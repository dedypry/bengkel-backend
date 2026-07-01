import { Injectable } from '@nestjs/common';
import { PaymentsModel } from 'models/payments.model';
import { SettingsModel } from 'models/settings.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { formatNumber } from 'utils/helpers/global';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import type { Response } from 'express';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ExcelJsService } from 'utils/services/exceljs.service';
import GeneratePDF from 'utils/services/pdf-make.service';
import {
  QueryFrequentCustomersDto,
  QueryRevenueDto,
  UpdateRevenueTargetDto,
} from './dto/reports.dto';

const REVENUE_TARGET_KEY = 'revenue_monthly_target';

type DailyTrendRow = {
  date: string;
  total: string | number;
};

type FrequentCustomerRow = {
  customer_id: number;
  name: string;
  phone: string;
  service_count: string | number;
  total_spending: string | number;
  last_service_at: string;
  vehicle_count: string | number;
};

@Injectable()
export class ReportsService {
  constructor(private readonly excelJs: ExcelJsService) {}
  async revenue(query: QueryRevenueDto, auth: IAuth) {
    const startDate = query.startDate
      ? dayjs(query.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      : dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss');

    const endDate = query.endDate
      ? dayjs(query.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      : dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    const startOfLastMonth = dayjs(startDate)
      .subtract(1, 'month')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfLastMonth = dayjs(endDate)
      .subtract(1, 'month')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');

    const [totalRevenue, lastRevenue, avg, wo, grafik, reportMonthly, trend] =
      await Promise.all([
        PaymentsModel.query()
          .where('company_id', auth.company_id)
          .whereBetween('payment_date', [startDate, endDate])
          .sum('amount')
          .first(),
        PaymentsModel.query()
          .where('company_id', auth.company_id)
          .whereBetween('payment_date', [startOfLastMonth, endOfLastMonth])
          .sum('amount')
          .first(),
        PaymentsModel.query()
          .where('company_id', auth.company_id)
          .whereBetween('payment_date', [startDate, endDate])
          .avg('amount')
          .first(),
        WorkOrdersModel.query()
          .where('company_id', auth.company_id)
          .whereBetween('created_at', [startDate, endDate])
          .count()
          .first(),
        this.getGrafik(startDate, endDate, auth),
        this.getMonthlyReport(auth),
        this.getDailyTrend(auth),
      ]);

    const currentTotal = Number((totalRevenue as any)?.sum || 0);
    const lastTotal = Number((lastRevenue as any)?.sum || 0);

    const diff = currentTotal - lastTotal;
    const growth =
      lastTotal > 0 ? (diff / lastTotal) * 100 : currentTotal > 0 ? 100 : 0;

    const formattedGrowth = `${growth > 0 ? '+' : ''}${formatNumber(growth)}%`;
    return {
      revenue: currentTotal,
      growthType: growth > 0 ? 'increment' : 'decrement',
      growth: formattedGrowth,
      avg: Number((avg as any).avg),
      wo: Number((wo as any).count),
      grafik,
      reportMonthly,
      trend,
    };
  }

  async updateMonthlyTarget(dto: UpdateRevenueTargetDto, auth: IAuth) {
    await SettingsModel.query()
      .insert({
        key: REVENUE_TARGET_KEY,
        value: String(dto.target_amount),
        company_id: auth.company_id,
        updated_by: auth.id,
      } as any)
      .onConflict(['key', 'company_id'])
      .merge(['value', 'updated_by'] as any);

    return {
      message: 'Target pendapatan bulanan berhasil disimpan',
      target_amount: dto.target_amount,
      reportMonthly: await this.getMonthlyReport(auth),
    };
  }

  private async getMonthlyTarget(companyId: number) {
    const setting = await SettingsModel.query()
      .where('company_id', companyId)
      .where('key', REVENUE_TARGET_KEY)
      .first();

    return Number(setting?.value || 0);
  }

  async getMonthlyReport(auth: IAuth) {
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    const startOfLastMonth = dayjs()
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfLastMonth = dayjs()
      .subtract(1, 'month')
      .set('date', dayjs().date())
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');

    const monthName = dayjs().locale('id').format('MMMM YYYY');
    const lastMonthName = dayjs()
      .subtract(1, 'month')
      .locale('id')
      .format('MMMM');

    const [currentResult, lastResult, targetAmount] = await Promise.all([
      PaymentsModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('payment_date', [startOfMonth, endOfMonth])
        .sum('amount as total')
        .first() as any,
      PaymentsModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('payment_date', [startOfLastMonth, endOfLastMonth])
        .sum('amount as total')
        .first() as any,
      this.getMonthlyTarget(auth.company_id),
    ]);

    const currentRevenue = Number(currentResult?.total || 0);
    const lastRevenue = Number(lastResult?.total || 0);

    const diff = currentRevenue - lastRevenue;
    const growthPercentage =
      lastRevenue > 0
        ? (diff / lastRevenue) * 100
        : currentRevenue > 0
          ? 100
          : 0;

    const resolvedTarget =
      targetAmount > 0
        ? targetAmount
        : lastRevenue > 0
          ? Math.round(lastRevenue * 1.1)
          : Math.max(currentRevenue, 10_000_000);

    const progressValue =
      resolvedTarget > 0
        ? Math.min(100, (currentRevenue / resolvedTarget) * 100)
        : 0;
    const remainingAmount = Math.max(0, resolvedTarget - currentRevenue);

    return {
      current_revenue: currentRevenue,
      target_amount: resolvedTarget,
      is_target_set: targetAmount > 0,
      progress_value: progressValue,
      progress_display: Math.min(100, progressValue),
      remaining_amount: remainingAmount,
      month_name: monthName,
      last_month_name: lastMonthName,
      last_month_revenue: lastRevenue,
      increase_amount: diff,
      growth_formatted: `${growthPercentage > 0 ? '+' : ''}${growthPercentage.toFixed(1)}%`,
      growth_value: growthPercentage,
    };
  }

  async getDailyTrend(auth: IAuth) {
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
    const today = dayjs().format('YYYY-MM-DD');

    const rows = await PaymentsModel.query()
      .select(PaymentsModel.raw('DATE(payment_date) as date'))
      .sum('amount as total')
      .where('company_id', auth.company_id)
      .whereRaw('DATE(payment_date) BETWEEN ? AND ?', [startOfMonth, today])
      .groupByRaw('DATE(payment_date)')
      .orderBy('date', 'asc')
      .castTo<DailyTrendRow[]>();

    const totalsByDate = new Map<string, number>();

    for (const row of rows) {
      const key = dayjs(row.date).format('YYYY-MM-DD');
      totalsByDate.set(key, Number(row.total) || 0);
    }

    const trend = [];
    let cursor = dayjs(startOfMonth);
    const end = dayjs(today);

    while (cursor.isBefore(end) || cursor.isSame(end, 'day')) {
      const key = cursor.format('YYYY-MM-DD');
      trend.push({
        name: cursor.locale('id').format('DD MMM'),
        date: key,
        total: totalsByDate.get(key) || 0,
      });
      cursor = cursor.add(1, 'day');
    }

    return trend;
  }

  async getGrafik(startDate: string, endDate: string, auth: IAuth) {
    const payments = await PaymentsModel.query()
      .where('company_id', auth.company_id)
      .whereBetween('payment_date', [startDate, endDate])
      .withGraphFetched('[work_order.[services, spareparts], order]')
      .castTo<any[]>();

    let totalService = 0;
    let totalSparepart = 0;
    let totalAksesoris = 0;

    payments.forEach((payment) => {
      if (payment.work_order) {
        payment.work_order.services?.forEach((s: any) => {
          totalService += Number(s.total_price || 0) * Number(s.qty || 1);
        });

        payment.work_order.spareparts?.forEach((sp: any) => {
          totalSparepart += Number(sp.total_price || 0) * Number(sp.qty || 1);
        });
      }

      if (payment.order) {
        totalAksesoris += Number(payment.order.grand_total || 0);
      }
    });

    const grandTotal = totalService + totalSparepart + totalAksesoris;

    const getPct = (val: number) =>
      grandTotal > 0 ? Math.round((val / grandTotal) * 100) : 0;

    return [
      {
        label: 'Jasa Servis',
        percentage: getPct(totalService),
        value: totalService,
        color: 'primary',
      },
      {
        label: 'Suku Cadang',
        percentage: getPct(totalSparepart),
        value: totalSparepart,
        color: 'secondary',
      },
      {
        label: 'Penjualan Offline',
        percentage: getPct(totalAksesoris),
        value: totalAksesoris,
        color: 'warning',
      },
    ];
  }

  private resolveFrequentCustomersRange(query: QueryFrequentCustomersDto) {
    const startDate = query.startDate
      ? dayjs(query.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      : dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss');

    const endDate = query.endDate
      ? dayjs(query.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      : dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    const limit = query.limit || 50;

    return { startDate, endDate, limit };
  }

  private async fetchFrequentCustomers(
    query: QueryFrequentCustomersDto,
    auth: IAuth,
  ) {
    const { startDate, endDate, limit } =
      this.resolveFrequentCustomersRange(query);

    const rows = (await WorkOrdersModel.knex()
      .from('work_orders')
      .join('customers', 'customers.id', 'work_orders.customer_id')
      .where('work_orders.company_id', auth.company_id)
      .whereNull('work_orders.deleted_at')
      .whereNot('work_orders.status', 'cancel')
      .whereBetween('work_orders.created_at', [startDate, endDate])
      .groupBy('customers.id', 'customers.name', 'customers.phone')
      .select(
        'customers.id as customer_id',
        'customers.name',
        'customers.phone',
        WorkOrdersModel.knex().raw('COUNT(work_orders.id) as service_count'),
        WorkOrdersModel.knex().raw(
          'COALESCE(SUM(work_orders.grand_total), 0) as total_spending',
        ),
        WorkOrdersModel.knex().raw(
          'MAX(work_orders.created_at) as last_service_at',
        ),
        WorkOrdersModel.knex().raw(
          'COUNT(DISTINCT work_orders.vehicle_id) as vehicle_count',
        ),
      )
      .orderBy('service_count', 'desc')
      .limit(limit)) as FrequentCustomerRow[];

    return rows.map((row, index) => ({
      rank: index + 1,
      customer_id: row.customer_id,
      name: row.name,
      phone: row.phone || '-',
      service_count: Number(row.service_count) || 0,
      total_spending: Number(row.total_spending) || 0,
      last_service_at: row.last_service_at,
      last_service_label: row.last_service_at
        ? dayjs(row.last_service_at).locale('id').format('DD MMM YYYY')
        : '-',
      vehicle_count: Number(row.vehicle_count) || 0,
    }));
  }

  async frequentCustomers(query: QueryFrequentCustomersDto, auth: IAuth) {
    const { startDate, endDate } = this.resolveFrequentCustomersRange(query);
    const items = await this.fetchFrequentCustomers(query, auth);

    const chart = items.slice(0, 10).map((item) => ({
      name:
        item.name.length > 18 ? `${item.name.slice(0, 18).trim()}…` : item.name,
      fullName: item.name,
      service_count: item.service_count,
      total_spending: item.total_spending,
    }));

    const totalServices = items.reduce(
      (sum, item) => sum + item.service_count,
      0,
    );
    const totalSpending = items.reduce(
      (sum, item) => sum + item.total_spending,
      0,
    );

    return {
      period: {
        startDate,
        endDate,
        label: `${dayjs(startDate).locale('id').format('DD MMM YYYY')} - ${dayjs(endDate).locale('id').format('DD MMM YYYY')}`,
      },
      summary: {
        customer_count: items.length,
        total_services: totalServices,
        total_spending: totalSpending,
        avg_services:
          items.length > 0
            ? Number((totalServices / items.length).toFixed(1))
            : 0,
      },
      items,
      chart,
    };
  }

  async exportFrequentCustomersExcel(
    query: QueryFrequentCustomersDto,
    auth: IAuth,
    res: Response,
  ) {
    const items = await this.fetchFrequentCustomers(
      { ...query, limit: query.limit || 100 },
      auth,
    );

    const body = items.map((item) => ({
      rank: item.rank,
      name: item.name,
      phone: item.phone,
      service_count: item.service_count,
      vehicle_count: item.vehicle_count,
      total_spending: item.total_spending,
      last_service_at: item.last_service_label,
    }));

    return this.excelJs.download({
      name: 'laporan-pelanggan-sering-service',
      headers: [
        { header: 'Peringkat', key: 'rank', width: 10 },
        { header: 'Nama Pelanggan', key: 'name', width: 28 },
        { header: 'Telepon', key: 'phone', width: 18 },
        { header: 'Jumlah Service', key: 'service_count', width: 16 },
        { header: 'Jumlah Kendaraan', key: 'vehicle_count', width: 18 },
        { header: 'Total Pengeluaran', key: 'total_spending', width: 20 },
        { header: 'Terakhir Service', key: 'last_service_at', width: 18 },
      ],
      body,
      res,
    });
  }

  async exportFrequentCustomersPdf(
    query: QueryFrequentCustomersDto,
    auth: IAuth,
    res: Response,
  ) {
    const items = await this.fetchFrequentCustomers(
      { ...query, limit: query.limit || 100 },
      auth,
    );
    const { startDate, endDate } = this.resolveFrequentCustomersRange(query);

    const tableBody = [
      [
        { text: 'No', style: 'tableHeader' },
        { text: 'Nama', style: 'tableHeader' },
        { text: 'Telepon', style: 'tableHeader' },
        { text: 'Service', style: 'tableHeader' },
        { text: 'Kendaraan', style: 'tableHeader' },
        { text: 'Total', style: 'tableHeader' },
        { text: 'Terakhir', style: 'tableHeader' },
      ],
      ...items.map((item) => [
        String(item.rank),
        item.name,
        item.phone,
        String(item.service_count),
        String(item.vehicle_count),
        `Rp ${formatNumber(item.total_spending)}`,
        item.last_service_label,
      ]),
    ];

    const content: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      pageMargins: [28, 28, 28, 28],
      content: [
        {
          text: 'Laporan Pelanggan Sering Service',
          style: 'title',
          margin: [0, 0, 0, 4],
        },
        {
          text: `Periode: ${dayjs(startDate).locale('id').format('DD MMM YYYY')} - ${dayjs(endDate).locale('id').format('DD MMM YYYY')}`,
          style: 'subtitle',
          margin: [0, 0, 0, 12],
        },
        {
          table: {
            headerRows: 1,
            widths: [24, '*', 70, 42, 52, 72, 68],
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
        subtitle: { fontSize: 9, color: '#64748b' },
        tableHeader: { bold: true, fillColor: '#eef2ff' },
      },
    };

    return GeneratePDF.make(res).download(
      content,
      'laporan-pelanggan-sering-service',
    );
  }
}
