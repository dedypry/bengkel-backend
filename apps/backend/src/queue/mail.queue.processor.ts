import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import 'dotenv/config';
import { CustomerEmailService } from 'utils/services/customer-email.service';

@Processor('MAIL-QUEUE')
export class MailQueueProcessor {
  constructor(private readonly customerEmailService: CustomerEmailService) {}

  @Process('send-mail-inv')
  async handleSendInvoice(job: Job) {
    const { to, subject, template, context, companyId } = job.data;

    try {
      const sent = await this.customerEmailService.sendEmail({
        companyId,
        to,
        subject,
        template,
        context,
      });

      console.log('sent', sent);

      if (!sent) {
        console.warn('[EMAIL SKIPPED]', {
          source: 'MAIL-QUEUE',
          template,
          to,
          subject,
        });
      }
    } catch (error) {
      console.error('[EMAIL FAILED]', {
        source: 'MAIL-QUEUE',
        template,
        to,
        subject,
        error,
      });
    }
  }
}
