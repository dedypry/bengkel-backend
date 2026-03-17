import 'dotenv/config';

import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { Response } from 'express';
import { PdfService } from 'utils/services/pdf.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import GeneratePDF from 'utils/services/pdf-make.service';

@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly pdfService: PdfService,
    @InjectQueue('MAIL-QUEUE') private readonly queue: Queue,
    // private readonly waService: WhatsappService,
  ) {}

  @Get(':id')
  async invoice(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const result = await this.invoicesService.payment(id, auth);
    const html = await renderHtml({ location: 'invoice', data: result });

    const content = await layoutPDF({
      header: 'Invoice',
      content: [html],
      companyId: result.company_id,
      invNo: result.trx_no,
      date: result.created_at,
    });

    return GeneratePDF.make(res).download(content);
  }

  @Post(':id/send')
  async invoiceSendWa(@Param('id') id: number, @Auth() auth: IAuth) {
    const result = await this.invoicesService.payment(id, auth);

    this.queue.add('send-mail-inv', {
      to: result.customer?.email,
      subject: `invoice-${result.trx_no}`,
      template: 'invoice',
      context: result,
    });
    return 'Email sedang proses pengiriman';

    // return this.waService.sendMessage({
    //   to: '6281286141441',
    //   file: buffer.toString('base64'),
    //   content: 'INI INVOICE NYA',
    //   fileType: 'application/pdf',
    // });
  }
}
