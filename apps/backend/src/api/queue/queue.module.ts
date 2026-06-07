import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueCron } from './queue.cron';
import { QueueService } from './queue.service';

@Module({
  controllers: [QueueController],
  providers: [QueueService, QueueCron],
})
export class QueueModule {}
