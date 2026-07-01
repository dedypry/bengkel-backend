import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { BullModule } from '@nestjs/bull';
import { MailQueueProcessor } from '../../queue/mail.queue.processor';
import { CustomerEmailModule } from 'utils/modules/customer-email.module';

@Module({
  imports: [
    CustomerEmailModule,
    BullModule.registerQueue({
      name: 'MAIL-QUEUE',
    }),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, MailQueueProcessor],
})
export class InvoicesModule {}
