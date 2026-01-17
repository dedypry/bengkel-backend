import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeDto } from './dto/employees.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import { IQuery } from 'utils/interfaces/query';
import { ProfilesModel } from 'models/profiles.model';
import { Row } from 'exceljs';
import { dataEmployer } from './dto/data';
import { ProvinceModel } from 'models/province.model';
import { CityModel } from 'models/city.model';
import slugify from 'slugify';
import { hashPassword } from 'utils/helpers/bcrypt';

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
      await UsersModel.relatedQuery('roles').for(data.id).relate(data.role_ids);
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
          roles: data.role_ids.map((e) => ({ id: e })),
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

  createFromImport(row: Row, auth: IAuth) {
    console.log(row.getCell('A').value, auth);
  }

  async autoCreate(auth: IAuth) {
    for (const item of dataEmployer) {
      let province = null as any;
      let city = null as any;

      if (item['PROVINSI']) {
        province = await ProvinceModel.query()
          .whereILike('name', item['PROVINSI'])
          .first();
      }
      if (item['KOTA']) {
        city = await CityModel.query().whereILike('name', item['KOTA']).first();
      }

      const payload = {
        nik: item['KODE'],
        name: item['NAMA'],
        email:
          slugify(item['NAMA'], {
            lower: true,
            strict: true,
            replacement: '',
            trim: true,
          }) + '@gmail.com',
        password: hashPassword('hcp@2025'),
        position: item['JABATAN'],
        company_id: auth.company_id,
        updated_by: auth.id,
        type: 'employed',
        status:
          item['STATUS'].toLowerCase() === 'tetap' ? 'permanent' : 'contract',
      };

      const payloadProfile = {
        full_name: item['NAMA'],
        phone_number: (item['NO. HP'] || item['NO. TELEPON'])?.replaceAll(
          "'",
          '',
        ),
        address: item['ALAMAT'],
        province_id: province?.id,
        city_id: city?.id,
        model: 'users',
      };

      const user = await UsersModel.query().findOne('nik', payload.nik);

      if (user) {
        await user.$query().patch(payload);
        await ProfilesModel.query()
          .update(payloadProfile)
          .where('user_id', user.id);
      } else {
        await UsersModel.query().insertGraph({
          ...payload,
          profile: payloadProfile,
        });
      }
    }
  }
}
