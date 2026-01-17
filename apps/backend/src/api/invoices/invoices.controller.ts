import 'dotenv/config';
import { S3Client } from '@aws-sdk/client-s3';

import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { Response } from 'express';
import { PdfService } from 'utils/services/pdf.service';
import { getHtmlContent } from 'utils/helpers/html-contect';

@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
  private readonly s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  private readonly bucketName = process.env.S3_BUCKET_NAME;

  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly pdfService: PdfService,
    // private readonly waService: WhatsappService,
  ) {}

  @Get(':id')
  async invoice(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const result = await this.invoicesService.payment(id, auth);

    const html = await getHtmlContent('invoice', result);

    await this.pdfService.downloadPdf({
      htmlContent: html,
      res,
      name: 'pdf of',
    });
  }

  @Get(':id/send-wa')
  async invoiceSendWa(@Param('id') id: number, @Auth() auth: IAuth) {
    const result = await this.invoicesService.payment(id, auth);

    const html = await getHtmlContent('invoice', result);

    const buffer = await this.pdfService.generatePdf({
      htmlContent: html,
    });

    return buffer;

    // return this.waService.sendMessage({
    //   to: '6281286141441',
    //   file: buffer.toString('base64'),
    //   content: 'INI INVOICE NYA',
    //   fileType: 'application/pdf',
    // });
  }
}
