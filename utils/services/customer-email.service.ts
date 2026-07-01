import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SettingsModel } from 'models/settings.model';
import { WorkOrdersModel } from 'models/work-orders.model';
import { renderEmailTemplate } from 'utils/helpers/render-email';

export const EMAIL_SETTING_KEYS = [
  'email_enabled',
  'smtp_host',
  'smtp_port',
  'smtp_secure',
  'smtp_user',
  'smtp_password',
  'smtp_from_name',
  'smtp_from_email',
  'email_notify_wo_ready',
  'email_notify_payment_complete',
  'email_notify_invoice',
] as const;

export type EmailSettingsMap = Record<string, string | null | undefined>;

@Injectable()
export class CustomerEmailService {
  parseBool(value?: string | null) {
    return value === 'true' || value === '1';
  }

  async getEmailSettings(companyId: number): Promise<EmailSettingsMap> {
    const rows = await SettingsModel.query()
      .where('company_id', companyId)
      .whereIn('key', [...EMAIL_SETTING_KEYS]);

    const settings: EmailSettingsMap = {};

    for (const row of rows) {
      settings[row.key] = row.value;
    }

    return settings;
  }

  isConfigured(settings: EmailSettingsMap) {
    return (
      this.parseBool(settings.email_enabled) &&
      !!settings.smtp_host &&
      !!settings.smtp_port &&
      !!settings.smtp_user &&
      !!settings.smtp_password
    );
  }

  createTransport(settings: EmailSettingsMap) {
    return nodemailer.createTransport({
      host: settings.smtp_host as string,
      port: Number(settings.smtp_port),
      secure: this.parseBool(settings.smtp_secure),
      auth: {
        user: settings.smtp_user as string,
        pass: settings.smtp_password as string,
      },
    });
  }

  async sendEmail(params: {
    companyId: number;
    to: string;
    subject: string;
    template: string;
    context: Record<string, unknown>;
  }) {
    const settings = await this.getEmailSettings(params.companyId);

    if (!this.isConfigured(settings)) {
      return false;
    }

    const recipient = params.to?.trim();

    if (!recipient) {
      return false;
    }

    const html = await renderEmailTemplate(params.template, params.context);
    const transport = this.createTransport(settings);
    const fromName = settings.smtp_from_name || 'Bengkel';
    const fromEmail = settings.smtp_from_email || settings.smtp_user;

    const result = await transport.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: recipient,
      subject: params.subject,
      html,
    });

    console.log('[EMAIL SUCCESS]', {
      template: params.template,
      to: recipient,
      subject: params.subject,
      messageId: result.messageId,
      response: result.response,
    });

    return true;
  }

  private queueSend(params: {
    companyId: number;
    to: string;
    subject: string;
    template: string;
    context: Record<string, unknown>;
  }) {
    void this.sendEmail(params)
      .then((sent) => {
        if (!sent) {
          console.warn('[EMAIL SKIPPED]', {
            template: params.template,
            to: params.to,
            subject: params.subject,
            reason: 'Konfigurasi email belum lengkap atau penerima kosong',
          });
        }
      })
      .catch((error) => {
        console.error('[EMAIL FAILED]', {
          template: params.template,
          to: params.to,
          subject: params.subject,
          error,
        });
      });
  }

  async loadWorkOrderContext(workOrderId: number, companyId: number) {
    return WorkOrdersModel.query()
      .withGraphFetched(
        '[items,services,spareparts,vehicle,customer.profile,mechanics,company,pic]',
      )
      .findOne({
        id: workOrderId,
        company_id: companyId,
      });
  }

  async notifyWoReady(workOrderId: number, companyId: number) {
    const settings = await this.getEmailSettings(companyId);

    if (
      !this.isConfigured(settings) ||
      !this.parseBool(settings.email_notify_wo_ready)
    ) {
      return;
    }

    const wo = await this.loadWorkOrderContext(workOrderId, companyId);
    const email = wo?.customer?.email?.trim();

    if (!wo || !email) {
      return;
    }

    this.queueSend({
      companyId,
      to: email,
      subject: `Kendaraan Siap Diambil - ${wo.trx_no}`,
      template: 'wo-ready',
      context: wo as unknown as Record<string, unknown>,
    });
  }

  async notifyPaymentComplete(workOrderId: number, companyId: number) {
    const settings = await this.getEmailSettings(companyId);

    if (
      !this.isConfigured(settings) ||
      !this.parseBool(settings.email_notify_payment_complete)
    ) {
      return;
    }

    const wo = await this.loadWorkOrderContext(workOrderId, companyId);
    const email = wo?.customer?.email?.trim();

    if (!wo || !email) {
      return;
    }

    this.queueSend({
      companyId,
      to: email,
      subject: `Pembayaran Selesai - ${wo.trx_no}`,
      template: 'payment-complete',
      context: wo as unknown as Record<string, unknown>,
    });
  }

  async notifyInvoice(
    workOrderId: number,
    companyId: number,
    options?: { force?: boolean },
  ) {
    const settings = await this.getEmailSettings(companyId);

    if (
      !this.isConfigured(settings) ||
      (!options?.force && !this.parseBool(settings.email_notify_invoice))
    ) {
      return;
    }

    const wo = await this.loadWorkOrderContext(workOrderId, companyId);
    const email = wo?.customer?.email?.trim();

    if (!wo || !email) {
      return;
    }

    this.queueSend({
      companyId,
      to: email,
      subject: `Invoice Layanan - ${wo.trx_no}`,
      template: 'invoice',
      context: wo as unknown as Record<string, unknown>,
    });
  }

  async sendTestEmail(companyId: number, to: string) {
    const settings = await this.getEmailSettings(companyId);

    if (!this.isConfigured(settings)) {
      throw new Error('Konfigurasi email belum lengkap atau belum diaktifkan');
    }

    return this.sendEmail({
      companyId,
      to,
      subject: 'Tes Konfigurasi Email Bengkel',
      template: 'test-email',
      context: {
        companyName: settings.smtp_from_name || 'Bengkel',
      },
    });
  }
}
