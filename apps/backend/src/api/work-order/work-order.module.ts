import { Module } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WorkOrderController } from './work-order.controller';
import { ServiceQueueDisplayController } from './service-queue-display.controller';
import { CustomerEmailModule } from 'utils/modules/customer-email.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { WorkOrderCron } from './work-order.cron';

@Module({
  imports: [CustomerEmailModule, NotificationsModule],
  controllers: [WorkOrderController, ServiceQueueDisplayController],
  providers: [WorkOrderService, WorkOrderCron],
})
export class WorkOrderModule {}
