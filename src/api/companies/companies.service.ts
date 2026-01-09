import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { UsersModel } from 'models/users.model';
import { CompaniesModel } from 'models/companies.model';
import slugify from 'slugify';
import { IAuth } from 'utils/interfaces/IAuth';
@Injectable()
export class CompaniesService {
  async create(body: CreateCompanyDto, auth: UsersModel) {
    if (auth.type !== 'owner') {
      throw new ForbiddenException('Hanya owner yang bisa membuat cabang');
    }

    return await CompaniesModel.transaction(async (trx) => {
      const company: any = await CompaniesModel.query(trx).upsertGraphAndFetch(
        {
          ...body,
          slug: slugify(body.name, { lower: true, strict: true }),
          users: [{ id: auth.id }],
        } as any,
        {
          relate: ['users'],
          noUpdate: ['users'],
        },
      );
      console.log('company', company);
      await auth.$query(trx).patch({
        company_id: company.id,
      });

      return company;
    });
  }

  async detail(id: number, auth: IAuth) {
    const find = await CompaniesModel.query().findOne({ id });

    if (!find && auth.company_id !== id) throw new NotFoundException();

    return find;
  }
}
