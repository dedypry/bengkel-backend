import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PdfService } from 'utils/services/pdf.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PdfService],
})
export class PaymentsModule {}
