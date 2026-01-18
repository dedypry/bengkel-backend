import { Injectable } from '@nestjs/common';
import { PaymentsModel } from 'models/payments.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { QueryRevenueDto } from './dto/reports.dto';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { WorkOrdersModel } from 'models/work-orders.model';
import { formatNumber } from 'utils/helpers/global';

@Injectable()
export class ReportsService {
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

    const [totalRevenue, lastRevenue, avg, wo, grafik, reportMonthly] =
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
    };
  }

  async getMonthlyReport(auth: IAuth) {
    // 1. Rentang Waktu Bulan Ini (Current Month)
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    // 2. Rentang Waktu Bulan Lalu (Last Month) - Apple to Apple (tanggal yang sama)
    // Contoh: Jika sekarang 18 Jan, maka bandingkan dengan 1-18 Des agar fair.
    const startOfLastMonth = dayjs()
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfLastMonth = dayjs()
      .subtract(1, 'month')
      .set('date', dayjs().date())
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');

    // Nama bulan untuk Label
    const lastMonthName = dayjs()
      .subtract(1, 'month')
      .locale('id')
      .format('MMMM');

    // 3. Eksekusi Query secara Paralel
    const [currentResult, lastResult] = await Promise.all([
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
    ]);

    const currentRevenue = Number(currentResult?.total || 0);
    const lastRevenue = Number(lastResult?.total || 0);

    // 4. Hitung Kenaikan
    const diff = currentRevenue - lastRevenue;
    const growthPercentage =
      lastRevenue > 0
        ? (diff / lastRevenue) * 100
        : currentRevenue > 0
          ? 100
          : 0;

    return {
      current_revenue: currentRevenue,
      last_month_name: lastMonthName,
      last_month_revenue: lastRevenue,
      increase_amount: diff,
      growth_formatted: `${growthPercentage > 0 ? '+' : ''}${growthPercentage.toFixed(1)}%`,
      growth_value: growthPercentage,
    };
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
        color: '#00A3AD',
      },
      {
        label: 'Suku Cadang',
        percentage: getPct(totalSparepart),
        value: totalSparepart,
        color: '#2D7FF9',
      },
      {
        label: 'Penjualan Offline',
        percentage: getPct(totalAksesoris),
        value: totalAksesoris,
        color: '#F98D00',
      },
    ];
  }
}
