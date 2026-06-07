import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QueueService } from './queue.service';

@Injectable()
export class QueueCron {
  constructor(private readonly queueService: QueueService) {}

  @Cron('0 0 * * *', { timeZone: 'Asia/Jakarta' })
  async handleDailyReset() {
    await this.queueService.resetDaily();
  }
}
