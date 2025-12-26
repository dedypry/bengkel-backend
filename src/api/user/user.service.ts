import { Injectable } from '@nestjs/common';
import { UserCompanyDto } from './dto/user.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class UserService {
  async setCompany(body: UserCompanyDto, auth: IAuth) {
    console.log(auth);
    const data = await UsersModel.query().findById(auth.id).update({
      company_id: body.company_id,
    });
    return data;
  }
}
