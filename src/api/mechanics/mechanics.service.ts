import { Injectable } from '@nestjs/common';
import { UsersModel } from 'models/users.model';

@Injectable()
export class MechanicsService {
  async list() {
    return await UsersModel.query()
      .joinRelated('roles')
      .where('roles.slug', 'mechanic')
      .withGraphFetched('[roles,profile.[province, city, district]]');
  }
}
