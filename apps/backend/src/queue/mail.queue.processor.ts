import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import 'dotenv/config';
import { getHtmlContent } from 'utils/helpers/html-contect';
import { PdfService } from 'utils/services/pdf.service';

@Processor('MAIL-QUEUE')
export class MailQueueProcessor {
  constructor(
    private readonly mailService: MailerService,
    private readonly pdfService: PdfService,
  ) {}

  @Process('send-mail-inv')
  async handleSendKta(job: Job) {
    const { template, context, to, subject } = job.data;
    try {
      const html = await getHtmlContent('invoice', context);
      const buffer = await this.pdfService.generatePdf({
        htmlContent: html,
      });
      await this.mailService.sendMail({
        to,
        subject,
        template: template,
        context,
        attachments: [
          {
            filename: `invoice.pdf`,
            content: buffer as any,
            contentType: 'application/pdf',
          },
        ],
      });
      console.log('SUCCESS SEND EMAIL');
    } catch (error) {
      console.error('ERROR', error);
    }
  }
}
