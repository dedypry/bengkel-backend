import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeDto } from './dto/employees.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import { IQuery } from 'utils/interfaces/query';
import { ProfilesModel } from 'models/profiles.model';

@Injectable()
export class EmployeesService {
  async list(auth: IAuth, query: IQuery) {
    const user = await UsersModel.query()
      .withGraphFetched('[profile,roles]')
      .where('company_id', auth.company_id)
      .whereNot('type', 'owner')
      .orderBy('created_at', 'desc')
      .page(query.page, query.pageSize);

    return user;
  }

  async create(data: EmployeeDto, auth: IAuth) {
    let nik: string | undefined;

    const payloadUser = {
      name: data.name,
      company_id: auth.company_id,
      department: data.department,
      email: data.email,
      status: data.status,
    };

    const payloadProfile = {
      city_id: data.city_id,
      province_id: data.province_id,
      district_id: data.district_id,
      address: data.address,
      full_name: data.name,
      join_date: data.join_date,
      phone_number: data.phone,
      photo_url: data.photo,
      emergency_contact: data.emergency_contact,
      emergency_name: data.emergency_name,
      gender: data.gender,
      birth_date: data.birth_date,
      place_birth: data.place_birth,
      model: 'users',
    };

    if (data.id) {
      const dataUser = await UsersModel.query()
        .withGraphFetched('profile')
        .findById(data.id)
        .where('company_id', auth.company_id);

      if (!dataUser) {
        throw new NotFoundException('Karyawan tidak ditemukan');
      }

      await dataUser.$query().patch(payloadUser);
      await ProfilesModel.query().upsertGraph({
        id: dataUser.profile?.id,
        user_id: dataUser.id,
        ...payloadProfile,
      } as any);

      await UsersModel.relatedQuery('roles').for(data.id).unrelate();
      await UsersModel.relatedQuery('roles').for(data.id).relate(data.role_id);
    } else {
      const [{ count }]: any = await UsersModel.query()
        .where('company_id', auth.company_id)
        .count();

      const sequence = (Number(count) + 1).toString().padStart(4, '0');
      nik = `${auth.company_id}${dayjs().format('YYMMDD')}${sequence}`;
      payloadUser['nik'] = nik;
      payloadUser['password'] = dayjs(data.birth_date).format('DDMMYYYY');

      return await UsersModel.query().insertGraph(
        {
          ...payloadUser,
          profile: payloadProfile as any,
          roles: [{ id: data.role_id }],
        },
        {
          relate: ['roles'],
        },
      );
    }
  }

  async detail(id: number, auth: IAuth) {
    const user = await UsersModel.query()
      .withGraphFetched('[profile.[province,city,district],roles]')
      .findOne({
        id,
        company_id: auth.company_id,
      });

    if (!user) throw new NotFoundException();

    return user;
  }

  async summary(auth: IAuth) {
    const result = (await UsersModel.query()
      .where('company_id', auth.company_id)
      .select([
        UsersModel.raw('count(*)::int as total'),
        UsersModel.raw(
          "count(*) filter (where lower(status) = 'permanent')::int as permanent",
        ),
      ])
      .first()) as any;

    return {
      total: result.total || 0,
      permanent: result.permanent || 0,
      department: 4,
    };
  }

  async destroy(id: number, auth: IAuth) {
    const user = await UsersModel.query()
      .where('id', id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at')
      .first();

    if (!user) throw new NotFoundException('User tidak di temukan');

    await (user.$query() as any).softDelete();
  }
}
