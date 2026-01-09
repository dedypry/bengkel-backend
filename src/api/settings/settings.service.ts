import { Injectable } from '@nestjs/common';
import { CompaniesModel } from 'models/companies.model';
import { SettingsModel } from 'models/settings.model';
import { IAuth } from 'utils/interfaces/IAuth';

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
}
