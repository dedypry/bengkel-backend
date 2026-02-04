import { Injectable } from '@nestjs/common';
import { BookingsModel } from 'models/bookings.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class DashboardService {
  async dashboard(auth: IAuth) {
    const [booking, wo, ongoingService, recentActivities] = await Promise.all([
      BookingsModel.query()
        .where('customer_id', auth.id)
        .whereNotIn('status', ['finish', 'cancelled'])
        .count()
        .first(),
      WorkOrdersModel.query().where('customer_id', auth.id).count().first(),
      WorkOrdersModel.query()
        .where('customer_id', auth.id)
        .withGraphFetched('vehicle')
        .orderBy('id', 'desc')
        .limit(1)
        .first(),

      WorkOrdersModel.query()
        .where('customer_id', auth.id)
        .where('status', 'finish')
        .orderBy('id', 'desc')
        .limit(5),
    ]);

    return {
      bookingActive: Number((booking as any)?.count || 0),
      totalService: Number((wo as any)?.count || 0),
      ongoingService: ongoingService || null,
      recentActivities,
    };
  }
}
