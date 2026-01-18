import { Injectable } from '@nestjs/common';
import { MechanicRatingsModel } from 'models/mechanic-ratings.model';
import { UsersModel } from 'models/users.model';
import { raw } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class MechanicsService {
  async list(auth: IAuth) {
    return await UsersModel.query()
      .alias('users')
      .joinRelated('roles')
      .select(
        'users.*',
        'mrm.*',
        UsersModel.relatedQuery('works')
          .alias('wo')
          .where('wo.status', 'closed')
          .count()
          .as('total_work'),
      )
      .where('roles.slug', 'mechanic')
      .where('users.company_id', auth.company_id)
      .withGraphFetched('[roles,profile.[province, city, district]]')
      .leftJoin(
        MechanicRatingsModel.query()
          .alias('mrm')
          .select('mechanic_id', raw('AVG(mrm.rating)::float').as('rating'))
          .groupBy('mechanic_id')
          .as('mrm'),
        'mrm.mechanic_id',
        'users.id',
      )
      .orderByRaw('mrm.rating DESC NULLS LAST');
  }

  async performa(auth: IAuth) {
    return await UsersModel.query()
      .alias('users')
      .joinRelated('roles')
      .where('roles.slug', 'mechanic')
      .where('users.company_id', auth.company_id)
      .withGraphFetched('[works]');
  }
}
