/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import 'dotenv/config';
import { getHtmlContent } from 'utils/helpers/html-contect';

@Processor('MAIL-QUEUE')
export class MailQueueProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('send-mail-inv')
  async handleSendKta(job: Job) {
    const { template, context, to, subject } = job.data;
    try {
      const html = await getHtmlContent('invoice', context);

      console.log('SUCCESS SEND EMAIL');
    } catch (error) {
      console.error('ERROR', error);
    }
  }
}
