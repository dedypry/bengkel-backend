import { Injectable } from '@nestjs/common';
import { ProductsModel } from 'models/products.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { ref } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import 'dayjs/locale/id';

@Injectable()
export class DashboardService {
  async detail(auth: IAuth) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [
      wo,
      countToday,
      countWork,
      countFinish,
      revenueToday,
      trends,
      revenueComparison,
      product,
    ] = await Promise.all([
      WorkOrdersModel.query()
        .withGraphFetched('[vehicle,customer.profile,mechanic]')
        .where('company_id', auth.company_id)
        .orderByRaw(`CASE WHEN status = 'closed' THEN 1 ELSE 0 END ASC`)
        .orderBy('created_at', 'desc')
        .limit(5),
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          startOfDay.toISOString(),
          endOfDay.toISOString(),
        ])
        .resultSize(),
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .where('progress', 'queue')
        .resultSize(),
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .where('progress', 'finish')
        .resultSize(),
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          startOfDay.toISOString(),
          endOfDay.toISOString(),
        ])
        .sum('grand_total')
        .first(),
      this.getRevenueTrend(auth),
      this.getRevenueComparison(auth),
      ProductsModel.query()
        .where('company_id', auth.company_id) // Selalu filter berdasarkan company
        .where('stock', '<', ref('min_stock'))
        .orderBy('stock', 'asc')
        .limit(5),
    ]);

    return {
      countToday,
      countWork,
      countFinish,
      revenueToday: Number((revenueToday as any)?.total || 0),
      trends,
      revenueComparison,
      product,
      wo,
    };
  }

  async getRevenueTrend(auth: IAuth) {
    const end = dayjs().tz().endOf('day');
    const start = end.subtract(6, 'day').startOf('day');

    const stats = await WorkOrdersModel.query()
      .where('company_id', auth.company_id)
      .whereBetween('created_at', [
        start.toISOString(),
        end.toISOString(),
      ])
      .select([
        WorkOrdersModel.raw('DATE(created_at) as date'),
        WorkOrdersModel.raw('SUM(grand_total) as grand_total'),
      ])
      .groupBy('date')
      .orderBy('date', 'asc');

    const trend = [] as Array<{ date: string; day: string; total: number }>;

    for (let i = 0; i < 7; i++) {
      const current = start.add(i, 'day');
      const dateString = current.format('YYYY-MM-DD');

      const found = stats.find((s: any) => {
        const dbDate = dayjs(s.date).format('YYYY-MM-DD');
        return dbDate === dateString;
      });

      trend.push({
        date: dateString,
        day: current.locale('id').format('dddd'),
        total: Number(found?.grand_total || 0),
      });
    }

    return trend;
  }

  async getRevenueComparison(auth: IAuth) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Rentang Minggu Ini (7 hari terakhir)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Rentang Minggu Lalu (14 hari lalu s/d 7 hari lalu)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const [currentWeek, lastWeek] = await Promise.all([
      // Query pendapatan minggu ini
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          sevenDaysAgo.toISOString(),
          today.toISOString(),
        ])
        .sum('grand_total as total')
        .first(),

      // Query pendapatan minggu lalu
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          fourteenDaysAgo.toISOString(),
          sevenDaysAgo.toISOString(),
        ])
        .sum('grand_total as total')
        .first(),
    ]);

    const currentTotal = Number((currentWeek as any)?.total || 0);
    const lastTotal = Number((lastWeek as any)?.total || 0);

    // Hitung Persentase
    let percentageChange = 0;
    if (lastTotal > 0) {
      percentageChange = ((currentTotal - lastTotal) / lastTotal) * 100;
    } else if (currentTotal > 0) {
      percentageChange = 100; // Jika minggu lalu 0 tapi sekarang ada pendapatan
    }

    return {
      currentTotal,
      lastTotal,
      percentageChange: parseFloat(percentageChange.toFixed(2)), // Batasi 2 angka di belakang koma
      status: percentageChange >= 0 ? 'increase' : 'decrease',
    };
  }
}
