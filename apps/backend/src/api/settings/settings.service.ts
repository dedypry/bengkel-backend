import { BadRequestException, Injectable } from '@nestjs/common';
import { CompaniesModel } from 'models/companies.model';
import { SettingsModel } from 'models/settings.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomerEmailService } from 'utils/services/customer-email.service';
import { UpdateServiceSettingsDTO } from './dto/settings.dto';

const MASKED_PASSWORD = '********';

@Injectable()
export class SettingsService {
  constructor(private readonly customerEmailService: CustomerEmailService) {}
  async detail(auth: IAuth) {
    const [company, settingData] = await Promise.all([
      CompaniesModel.query().findById(auth.company_id),
      SettingsModel.query().where('company_id', auth.company_id),
    ]);

    const settings = {} as any;

    for (const item of settingData) {
      settings[item.key as any] = item.value;
    }

    return {
      company,
      settings,
    };
  }

  async setting(auth: IAuth) {
    const settings = await SettingsModel.query()
      .where((builder) => {
        builder.where('company_id', auth.company_id).orWhereNull('company_id');
      })
      .distinctOn('key')
      .orderBy([
        { column: 'key' },
        { column: 'company_id', order: 'desc', nulls: 'last' },
      ]);

    const result = {};

    for (const item of settings) {
      result[item.key] =
        item.key === 'smtp_password' && item.value
          ? MASKED_PASSWORD
          : item.value;
    }

    return result;
  }

  private serializeSettingValue(key: string, val: unknown) {
    if (val === null || val === undefined) {
      return null;
    }

    if (typeof val === 'boolean') {
      return val ? 'true' : 'false';
    }

    if (Array.isArray(val)) {
      return key === 'next_service_notes' ? JSON.stringify(val) : val.join(',');
    }

    return String(val as any);
  }

  async updateSetting(body: UpdateServiceSettingsDTO, auth: IAuth) {
    const entries = Object.entries(body).filter(([key, val]) => {
      if (key === 'smtp_password') {
        return val && val !== MASKED_PASSWORD;
      }

      return val !== undefined;
    });

    const settings = entries.map(([key, val]) => ({
      key,
      value: this.serializeSettingValue(key, val),
      company_id: auth.company_id,
    }));

    await SettingsModel.query()
      .insert(settings)
      .onConflict(['key', 'company_id'])
      .merge(['value']);

    return 'data berhasil di perbaharui';
  }

  async sendTestEmail(email: string, auth: IAuth) {
    const sent = await this.customerEmailService.sendTestEmail(
      auth.company_id,
      email,
    );

    if (!sent) {
      throw new BadRequestException(
        'Gagal mengirim email. Periksa konfigurasi SMTP.',
      );
    }

    return { message: 'Email tes berhasil dikirim' };
  }
}
