import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CustomerEmailService } from 'utils/services/customer-email.service';

@Injectable()
export class WorkOrderCron {
  constructor(private readonly customerEmailService: CustomerEmailService) {}

  @Cron('0 8 * * *', { timeZone: 'Asia/Jakarta' })
  async handleNextServiceReminders() {
    await this.customerEmailService.processScheduledNextServiceReminders();
  }
}
