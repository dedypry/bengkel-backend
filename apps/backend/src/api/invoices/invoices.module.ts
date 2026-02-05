import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PdfService } from 'utils/services/pdf.service';
import { BullModule } from '@nestjs/bull';
import { MailQueueProcessor } from '../../queue/mail.queue.processor';
// import { WhatsappService } from 'utils/services/wa.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'MAIL-QUEUE',
    }),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, PdfService, MailQueueProcessor],
})
export class InvoicesModule {}
