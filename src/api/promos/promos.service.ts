import { ForbiddenException, Injectable } from '@nestjs/common';
import { IAuth } from 'utils/interfaces/IAuth';
import { PromosModel } from 'models/promos.model';
import { CreatePromoDto } from './dto/promos.dto';

@Injectable()
export class PromosService {
  async list(auth: IAuth) {
    return await PromosModel.query().where('company_id', auth.company_id);
  }
  async create(body: CreatePromoDto, auth: IAuth) {
    const promo = await PromosModel.query()
      .where('code', body.code)
      .where('company_id', auth.company_id)
      .first();

    if (promo) throw new ForbiddenException('Promo sudah ada');

    await PromosModel.query().insert({
      ...body,
      company_id: auth.company_id,
    });

    return 'promo berhasil di buat';
  }
}
