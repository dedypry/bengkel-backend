import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PdfService } from 'utils/services/pdf.service';
// import { WhatsappService } from 'utils/services/wa.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PdfService],
})
export class InvoicesModule {}
