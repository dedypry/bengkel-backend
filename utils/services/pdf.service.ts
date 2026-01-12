// pdf.service.ts
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as puppeteer from 'puppeteer';

interface IPdf {
  htmlContent: string;
  header?: any;
  format?: string;
  landscape?: boolean;
}

interface IPdfDownload extends IPdf {
  res?: Response;
  name?: string;
}
@Injectable()
export class PdfService {
  async generatePdf({
    htmlContent,
    format = 'A4',
    landscape,
    header,
  }: IPdf): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    const pdfBuffer = await page.pdf({
      format: format as any,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: header,
      landscape,
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }

  async downloadPdf({
    htmlContent,
    res,
    name,
    landscape = false,
  }: IPdfDownload) {
    const pdf = await this.generatePdf({
      htmlContent,
      landscape,
    });

    if (!res) {
      return Buffer.from(pdf);
    }

    return res
      .set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${name}.pdf"`,
        'Content-Length': Buffer.byteLength(pdf),
      })
      .send(Buffer.from(pdf));
  }
}
