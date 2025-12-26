import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employees.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';

@Injectable()
export class EmployeesService {
  async create(data: EmployeeDto, auth: IAuth) {
    const [{ count }]: any = await UsersModel.query()
      .where('company_id', auth.company_id)
      .count();
    const sequence = (Number(count) + 1).toString().padStart(4, '0');

    const nik = `${auth.company_id}${dayjs().format('YYMMDD')}${sequence}`;
    const pay = await UsersModel.query().insertGraph({
      nik,
      name: data.name,
      password: dayjs(data.birth_date).format('DDMMYYYY'),
      company_id: auth.company_id,
      department: data.department,
      email: data.email,
      status: data.status,
      profile: {
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
    } as any);

    return pay;
  }
}
