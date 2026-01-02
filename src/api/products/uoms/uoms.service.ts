import { Injectable } from '@nestjs/common';
import { UomsModel } from 'models/uoms.model';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class UomsService {
  async list(auth: IAuth) {
    return await UomsModel.query().where((builder) => {
      builder.where('company_id', auth.company_id).orWhereNull('company_id');
    });
  }
}
