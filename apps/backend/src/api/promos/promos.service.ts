import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuth } from 'utils/interfaces/IAuth';
import { PromosModel } from 'models/promos.model';
import {
  CheckPromo,
  CreatePromoDto,
  QueryPromo,
  UpdatePromoDto,
} from './dto/promos.dto';

@Injectable()
export class PromosService {
  async list(auth: IAuth, query: QueryPromo) {
    return await PromosModel.query()
      .where('company_id', auth.company_id)
      .where((builder) => {
        if (query.q) {
          builder
            .whereILike('code', `%${query.q}%`)
            .orWhereILike('name', `%${query.q}%`);
        }

        if (query.status === 'active') {
          builder.where('is_active', true).where('end_date', '>=', new Date());
        }

        if (query.status === 'end') {
          builder.where((sub) => {
            sub.where('is_active', false).orWhere('end_date', '<', new Date());
          });
        }
      });
  }
  async create(body: CreatePromoDto, auth: IAuth) {
    const promo = await PromosModel.query()
      .where('code', body.code)
      .where('company_id', auth.company_id)
      .first();

    if (promo && !body.id) throw new ForbiddenException('Promo sudah ada');

    await PromosModel.query().upsertGraph({
      ...body,
      company_id: auth.company_id,
      updated_by: auth.id,
    });

    return 'promo berhasil di buat';
  }

  async updateStatus(id: number, body: UpdatePromoDto, auth: IAuth) {
    const promo = await PromosModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!promo) throw new NotFoundException();

    await promo.$query().patch({
      ...body,
      company_id: auth.company_id,
      updated_by: auth.id,
    });
  }
  async destroy(id: number, auth: IAuth) {
    const promo = await PromosModel.query().findOne({
      id,
      company_id: auth.company_id,
    });

    if (!promo) throw new NotFoundException();

    await promo.$query().del();
  }

  async checkCode(body: CheckPromo, auth: IAuth) {
    const now = new Date().toISOString();
    if (!body.code) throw new NotFoundException('Promo tidak ditemukan');

    const promo = await PromosModel.query()
      .where('code', body.code!)
      .andWhere('company_id', auth.company_id)
      .andWhere('is_active', true)
      .andWhere('start_date', '<=', now)
      .andWhere('end_date', '>=', now)
      .andWhere((query) => {
        query.where('quota', 0).orWhereRaw('used_count < quota');
      })
      .first();
    if (!promo) throw new NotFoundException('Promo tidak ditemukan');

    return promo;
  }
}
