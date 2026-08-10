import { Injectable } from '@nestjs/common';
import { ProductsModel } from 'models/products.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { ref } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import 'dayjs/locale/id';

export type RevenuePeriod = '7d' | '1m' | '3m' | '1y';

const REVENUE_PERIODS: RevenuePeriod[] = ['7d', '1m', '3m', '1y'];

@Injectable()
export class DashboardService {
  normalizeRevenuePeriod(period?: string): RevenuePeriod {
    return REVENUE_PERIODS.includes(period as RevenuePeriod)
      ? (period as RevenuePeriod)
      : '7d';
  }
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
        .withGraphFetched('[vehicle,customer.profile,mechanics]')
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
      this.getRevenueTrend(auth, '7d'),
      this.getRevenueComparison(auth, '7d'),
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

  async getRevenueTrendDetail(auth: IAuth, periodInput?: string) {
    const period = this.normalizeRevenuePeriod(periodInput);
    const [trends, revenueComparison] = await Promise.all([
      this.getRevenueTrend(auth, period),
      this.getRevenueComparison(auth, period),
    ]);

    return { period, trends, revenueComparison };
  }

  async getRevenueTrend(auth: IAuth, period: RevenuePeriod = '7d') {
    switch (period) {
      case '1m':
        return this.buildDailyTrend(auth, 30, (current) =>
          current.locale('id').format('D MMM'),
        );
      case '3m':
        return this.buildWeeklyTrend(auth);
      case '1y':
        return this.buildMonthlyTrend(auth);
      case '7d':
      default:
        return this.buildDailyTrend(auth, 7, (current) =>
          current.locale('id').format('dddd'),
        );
    }
  }

  private async fetchDailyRevenueStats(
    auth: IAuth,
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
  ) {
    const stats = await WorkOrdersModel.query()
      .where('company_id', auth.company_id)
      .whereBetween('created_at', [start.toISOString(), end.toISOString()])
      .select([
        WorkOrdersModel.raw('DATE(created_at) as date'),
        WorkOrdersModel.raw('SUM(grand_total) as grand_total'),
      ])
      .groupBy('date')
      .orderBy('date', 'asc');

    return new Map(
      stats.map((s: any) => [
        dayjs(s.date).format('YYYY-MM-DD'),
        Number(s.grand_total || 0),
      ]),
    );
  }

  private async buildDailyTrend(
    auth: IAuth,
    dayCount: number,
    labelFn: (current: dayjs.Dayjs) => string,
  ) {
    const end = dayjs().tz().endOf('day');
    const start = end.subtract(dayCount - 1, 'day').startOf('day');
    const statsMap = await this.fetchDailyRevenueStats(auth, start, end);
    const trend = [] as Array<{ date: string; day: string; total: number }>;

    for (let i = 0; i < dayCount; i++) {
      const current = start.add(i, 'day');
      const dateString = current.format('YYYY-MM-DD');

      trend.push({
        date: dateString,
        day: labelFn(current),
        total: statsMap.get(dateString) || 0,
      });
    }

    return trend;
  }

  private async buildWeeklyTrend(auth: IAuth) {
    const end = dayjs().tz().endOf('day');
    const start = end.subtract(89, 'day').startOf('day');
    const statsMap = await this.fetchDailyRevenueStats(auth, start, end);
    const trend = [] as Array<{ date: string; day: string; total: number }>;

    let weekStart = start.startOf('week');

    while (weekStart.isBefore(end) || weekStart.isSame(end, 'week')) {
      const weekEnd = weekStart.endOf('week');
      let total = 0;

      for (
        let current = weekStart;
        current.isBefore(weekEnd) || current.isSame(weekEnd, 'day');
        current = current.add(1, 'day')
      ) {
        if (current.isBefore(start) || current.isAfter(end)) {
          continue;
        }

        total += statsMap.get(current.format('YYYY-MM-DD')) || 0;
      }

      trend.push({
        date: weekStart.format('YYYY-MM-DD'),
        day: weekStart.locale('id').format('D MMM'),
        total,
      });

      weekStart = weekStart.add(1, 'week');
    }

    return trend;
  }

  private async buildMonthlyTrend(auth: IAuth) {
    const end = dayjs().tz().endOf('day');
    const start = end.subtract(11, 'month').startOf('month');

    const stats = await WorkOrdersModel.query()
      .where('company_id', auth.company_id)
      .whereBetween('created_at', [start.toISOString(), end.toISOString()])
      .select([
        WorkOrdersModel.raw("DATE_TRUNC('month', created_at)::date as date"),
        WorkOrdersModel.raw('SUM(grand_total) as grand_total'),
      ])
      .groupBy('date')
      .orderBy('date', 'asc');

    const statsMap = new Map(
      stats.map((s: any) => [
        dayjs(s.date).format('YYYY-MM'),
        Number(s.grand_total || 0),
      ]),
    );

    const trend = [] as Array<{ date: string; day: string; total: number }>;

    for (let i = 0; i < 12; i++) {
      const current = start.add(i, 'month');
      const monthKey = current.format('YYYY-MM');

      trend.push({
        date: current.startOf('month').format('YYYY-MM-DD'),
        day: current.locale('id').format('MMM YY'),
        total: statsMap.get(monthKey) || 0,
      });
    }

    return trend;
  }

  async getRevenueComparison(auth: IAuth, period: RevenuePeriod = '7d') {
    const end = dayjs().tz().endOf('day');
    let currentStart: dayjs.Dayjs;
    let previousStart: dayjs.Dayjs;
    let previousEnd: dayjs.Dayjs;

    switch (period) {
      case '1m':
        currentStart = end.subtract(29, 'day').startOf('day');
        previousEnd = currentStart.subtract(1, 'millisecond');
        previousStart = previousEnd.subtract(29, 'day').startOf('day');
        break;
      case '3m':
        currentStart = end.subtract(89, 'day').startOf('day');
        previousEnd = currentStart.subtract(1, 'millisecond');
        previousStart = previousEnd.subtract(89, 'day').startOf('day');
        break;
      case '1y':
        currentStart = end.subtract(11, 'month').startOf('month');
        previousEnd = currentStart.subtract(1, 'millisecond');
        previousStart = previousEnd.subtract(11, 'month').startOf('month');
        break;
      case '7d':
      default:
        currentStart = end.subtract(6, 'day').startOf('day');
        previousEnd = currentStart.subtract(1, 'millisecond');
        previousStart = previousEnd.subtract(6, 'day').startOf('day');
        break;
    }

    const [currentRange, previousRange] = await Promise.all([
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          currentStart.toISOString(),
          end.toISOString(),
        ])
        .sum('grand_total as total')
        .first(),
      WorkOrdersModel.query()
        .where('company_id', auth.company_id)
        .whereBetween('created_at', [
          previousStart.toISOString(),
          previousEnd.toISOString(),
        ])
        .sum('grand_total as total')
        .first(),
    ]);

    const currentTotal = Number((currentRange as any)?.total || 0);
    const lastTotal = Number((previousRange as any)?.total || 0);

    let percentageChange = 0;
    if (lastTotal > 0) {
      percentageChange = ((currentTotal - lastTotal) / lastTotal) * 100;
    } else if (currentTotal > 0) {
      percentageChange = 100;
    }

    return {
      currentTotal,
      lastTotal,
      percentageChange: parseFloat(percentageChange.toFixed(2)),
      status: percentageChange >= 0 ? 'increase' : 'decrease',
    };
  }
}
