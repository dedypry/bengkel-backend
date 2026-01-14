import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePayment } from './dto/payments.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { getHtmlContent } from 'utils/helpers/html-contect';
import { PdfService } from 'utils/services/pdf.service';
import type { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  createPayment(@Body() body: CreatePayment, @Auth() auth: IAuth) {
    if (body.type === 'product') {
      return this.paymentsService.createPaymentProduct(body, auth);
    }
    return this.paymentsService.createPayment(body, auth);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.paymentsService.paymentDetail(id, auth);
  }

  @Get(':id/print')
  async print(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const detail = await this.paymentsService.paymentDetail(id, auth);
    const html = await getHtmlContent('struk', detail);

    await this.pdfService.downloadPdf({
      htmlContent: html,
      res,
      name: 'struk',
      width: '80mm',
    });
  }
}
