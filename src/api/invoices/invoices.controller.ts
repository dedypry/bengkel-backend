import 'dotenv/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import type { Response } from 'express';
import { PdfService } from 'utils/services/pdf.service';
import { getHtmlContent } from 'utils/helpers/html-contect';
import { sendWhatsAppMessage } from 'utils/helpers/send-wa';
import { ImagesModel } from 'models/images.model';

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

    const fileName = `${result.trx_no}.pdf`;
    const folderPath = `company-${auth.company_id}/invoices`;
    const fullKey = `${folderPath}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fullKey,
      Body: buffer,
      ContentType: 'application/pdf',
      Metadata: {
        'updated-at': new Date().toISOString(),
      },
    });

    await this.s3Client.send(command);

    const url = `https://${this.bucketName}.s3.${process.env.S3_REGION}.amazonaws.com/${fullKey}`;

    const img = await ImagesModel.query().findOne('path', url);
    if (!img) {
      await ImagesModel.query().insert({
        model: 'invoice',
        company_id: auth.company_id,
        filename: fileName,
        size: 1000,
        path: url,
        updated_by: auth.id,
        mime_type: 'application/pdf',
      });
    }
    const wa = await sendWhatsAppMessage(
      '+6281286141441',
      'Halo, berikut adalah invoice Anda.',
      url,
    );
    return wa;
  }
}
