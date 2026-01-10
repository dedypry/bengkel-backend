import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { UsersModel } from 'models/users.model';
import { CompaniesModel } from 'models/companies.model';
import slugify from 'slugify';
import { IAuth } from 'utils/interfaces/IAuth';
import { AddressModel } from 'models/address.model';
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

      await auth.$query(trx).patch({
        company_id: company.id,
      });

      return company;
    });
  }

  async detail(id: number, auth: IAuth) {
    const find = await CompaniesModel.query()
      .withGraphFetched('[address]')
      .findOne({ id });

    if (!find && auth.company_id !== id) throw new NotFoundException();

    return find;
  }

  async update(body: UpdateCompanyDto, auth: IAuth) {
    const company = await CompaniesModel.query().findOne({
      id: body.id,
    });

    if (!company || auth.company_id != company.id) {
      throw new NotFoundException();
    }

    await CompaniesModel.transaction(async (trx) => {
      await company.$query(trx).patch({
        id: company.id,
        name: body.name,
        slug: slugify(body.name, { lower: true, strict: true }),
        logo_url: body.logo_url,
        email: body.email,
        phone_number: body.phone_number,
        fax: body.phone_number,
        npwp: body.npwp,
        updated_by: auth.id,
        ppn: body.ppn,
        is_discount_birth_day: body.is_discount_birth_day,
        total_discount_birth_day: body.total_discount_birth_day,
        max_discount_birth_day: body.max_discount_birth_day,
        type_discount_birth_day: body.type_discount_birth_day,
      });

      if (body.address) {
        const existingAddress = await AddressModel.query(trx).findOne({
          parent_id: company.id,
          model: 'companies',
        });

        if (existingAddress) {
          await existingAddress.$query(trx).patch(body.address);
        } else {
          await AddressModel.query(trx).insert({
            ...body.address,
            parent_id: company.id,
            model: 'companies',
          });
        }
      }
      return company;
    });

    return 'Data perusahaan berhasil diupdate';
  }
}
