import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PusherService } from './pusher.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PusherService],
  exports: [NotificationsService, PusherService],
})
export class NotificationsModule {}
