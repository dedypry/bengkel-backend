import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeDto } from './dto/employees.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import { IQuery } from 'utils/interfaces/query';

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
    let nik: any = undefined;
    let dataUser: UsersModel | undefined = undefined;

    if (!data.id) {
      const [{ count }]: any = await UsersModel.query()
        .where('company_id', auth.company_id)
        .count();

      const sequence = (Number(count) + 1).toString().padStart(4, '0');

      nik = `${auth.company_id}${dayjs().format('YYMMDD')}${sequence}`;
    }

    if (data.id) {
      dataUser = await UsersModel.query()
        .withGraphFetched('[profile]')
        .findOne({
          id: data.id,
          company_id: auth.company_id,
        });

      if (!dataUser) throw new NotFoundException('Karyawan tidak di temukan');
    }
    const pay = await UsersModel.transaction(
      async (trx) =>
        await UsersModel.query(trx).upsertGraph(
          {
            id: dataUser?.id || undefined,
            name: data.name,
            ...(!dataUser && {
              nik,
              password: dayjs(data.birth_date).format('DDMMYYYY'),
            }),
            company_id: auth.company_id,
            department: data.department,
            email: data.email,
            status: data.status,
            profile: {
              id: dataUser?.profile?.id || undefined,
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
            },
            roles: [{ id: data.role_id }],
          } as any,
          { relate: ['roles'] },
        ),
    );

    return pay;
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
