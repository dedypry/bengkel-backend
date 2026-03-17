import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreatePayment } from './dto/payments.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PdfService } from 'utils/services/pdf.service';
import type { Response } from 'express';
import { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import GeneratePDF from 'utils/services/pdf-make.service';
import terbilang from '@gratcy/angka-terbilang-indonesia';
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.paymentsService.list(query, auth);
  }

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

    const html = await renderHtml({
      location: 'so',
      data: {
        ...detail,
        terbilang: terbilang(Number(detail.order.grand_total), {
          dec: '',
          lang: 'id',
        }),
        totalQty: detail.order.items.reduce((sum, a) => sum + Number(a.qty), 0),
      },
    });

    const content = await layoutPDF({
      header: 'Order Penjualan',
      content: [html],
      companyId: auth.company_id,
      invNo: detail.payment_no,
      date: detail.created_at,
    });
    return GeneratePDF.make(res).download(content);
  }
}
