import { Injectable } from '@nestjs/common';
import { CompaniesModel } from 'models/companies.model';
import { SettingsModel } from 'models/settings.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { UpdateServiceSettingsDTO } from './dto/settings.dto';

@Injectable()
export class SettingsService {
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
      result[item.key] = item.value;
    }

    return result;
  }

  async updateSetting(body: UpdateServiceSettingsDTO, auth: IAuth) {
    const settings = Object.entries(body).map(([key, val]) => ({
      key: key,
      value: val === null ? null : String(val),
      company_id: auth.company_id,
    }));

    await SettingsModel.query()
      .insert(settings)
      .onConflict(['key', 'company_id'])
      .merge(['value']);

    return 'data berhasil di perbaharui';
  }
}
