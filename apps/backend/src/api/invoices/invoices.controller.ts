import 'dotenv/config';

import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { QueryParamInvoice } from './dto/invoice.dto';
import { calculateTotalEstimation } from 'utils/helpers/global';

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
    @Query() query: QueryParamInvoice,
  ) {
    const result = await this.invoicesService.payment(id, auth);

    const estimated = calculateTotalEstimation(
      result.services.map((e) => ({
        estimated: e.data.estimated_duration,
        type: e.data.estimated_type?.toLowerCase(),
      })),
    );
    const data_mechanics = result.mechanics.map((e) => e.name).join(', ');
    console.log(result.mechanics);

    const data = {
      location: 'invoice',
      header: 'INVOICE',
    };

    if (query.type === 'estimation') {
      data.location = 'wo-estimation';
      data.header = 'ESTIMASI BIAYA SERVICE';
    } else if (query.type === 'wo') {
      data.location = 'wo-invoice';
      data.header = 'PERINTAH KERJA BENGKEL';
    }

    const html = await renderHtml({
      location: data.location,
      data: { ...result, estimated, data_mechanics },
    });

    const content = await layoutPDF({
      header: data.header,
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
