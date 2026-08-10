import { Injectable } from '@nestjs/common';
import { MechanicRatingsModel } from 'models/mechanic-ratings.model';
import { SettingsModel } from 'models/settings.model';
import { UsersModel } from 'models/users.model';
import { raw } from 'objection';
import { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';

@Injectable()
export class MechanicsService {
  async list(query: IQuery, auth: IAuth) {
    const config = await SettingsModel.query()
      .where('key', 'mechanic_roles')
      .where('company_id', auth.company_id)
      .first();

    const roles = config?.value ? config.value.split(',') : ['mechanic'];

    return await UsersModel.query()
      .alias('users')
      .joinRelated('roles')
      .select(
        'users.*',
        'mrm.*',
        UsersModel.relatedQuery('works')
          .alias('wo')
          .whereIn('wo.progress', ['ready', 'finish'])
          .count()
          .as('total_work'),
      )
      .whereIn('roles.slug', roles)
      .where('users.company_id', auth.company_id)
      .where((build) => {
        if (query.q) {
          build.whereILike('users.name', `%${query.q}%`);
        }
      })
      .withGraphFetched('[roles,profile.[province, city, district]]')
      .leftJoin(
        MechanicRatingsModel.query()
          .alias('mrm')
          .select(
            'mechanic_id',
            raw('ROUND(AVG(mrm.rating)::numeric, 2)::float').as('rating'),
            raw('COUNT(mrm.id)::int').as('review_count'),
          )
          .where('company_id', auth.company_id)
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
