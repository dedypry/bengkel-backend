import { Injectable } from '@nestjs/common';
import { RolesModel } from 'models/roles.model';

@Injectable()
export class RolesService {
  async list() {
    return await RolesModel.query();
  }
}
