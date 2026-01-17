import { Injectable } from '@nestjs/common';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class MechanicsService {
  async list(auth: IAuth) {
    return await UsersModel.query()
      .joinRelated('roles')
      .where('roles.slug', 'mechanic')
      .where('company_id', auth.company_id)
      .withGraphFetched('[roles,profile.[province, city, district]]');
  }
}
