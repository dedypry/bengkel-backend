import { Injectable } from '@nestjs/common';
import { UserCompanyDto } from './dto/user.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CompaniesModel } from 'models/companies.model';

@Injectable()
export class UserService {
  async setCompany(body: UserCompanyDto, auth: IAuth) {
    await UsersModel.query().findById(auth.id).update({
      company_id: body.company_id,
    });

    return await CompaniesModel.query()
      .withGraphFetched('[address]')
      .findById(body.company_id);
  }
}
