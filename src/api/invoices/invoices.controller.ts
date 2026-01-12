import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import type { Response } from 'express';
import { PdfService } from 'utils/services/pdf.service';
import { getHtmlContent } from 'utils/helpers/html-contect';

@UseGuards(AuthGuard)
@Controller('invoices')
export class InvoicesController {
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

    const [header, html] = await Promise.all([
      getHtmlContent('header', result),
      getHtmlContent('invoice', result),
    ]);

    await this.pdfService.downloadPdf({
      htmlContent: html,
      res,
      name: 'pdf of',
      header: header,
    });
  }
}
