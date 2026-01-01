import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/company.dto';
import { UsersModel } from 'models/users.model';
import { CompaniesModel } from 'models/companies.model';
import slugify from 'slugify';
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
}
