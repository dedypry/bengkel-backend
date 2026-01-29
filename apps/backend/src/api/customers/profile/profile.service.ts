import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChangePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { IAuth } from 'utils/interfaces/IAuth';
import { CustomersModel } from 'models/customers.model';
import { ProfilesModel } from 'models/profiles.model';
import { comparePassword, hashPassword } from 'utils/helpers/bcrypt';

@Injectable()
export class ProfileService {
  async updateProfile(data: UpdateProfileDto, auth: IAuth) {
    const user = await CustomersModel.query().findById(auth.id);

    if (!user) throw new NotFoundException();

    await user.$query().patch({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });

    const profile = await ProfilesModel.query().findOne({
      user_id: user.id,
      model: 'customers',
    });

    const payloadProfile = {
      user_id: user.id,
      full_name: data.name,
      phone_number: data.phone,
      address: data.address,
      province_id: Number(data.province_id),
      city_id: Number(data.city_id),
      district_id: Number(data.district_id),
    };

    if (profile) {
      await profile.$query().patch(payloadProfile);
    } else {
      await ProfilesModel.query().insert(payloadProfile);
    }

    return 'data berhasil di simpan';
  }

  async changePassword(body: ChangePasswordDto, auth: IAuth) {
    const user = await CustomersModel.query().findById(auth.id);

    if (!user) throw new NotFoundException();

    const isValid = comparePassword(body.currentPassword, user.password!);

    if (!isValid) throw new ForbiddenException('Email/Password salah');

    await user.$query().patch({
      password: hashPassword(body.newPassword),
    });

    return 'Password berhasil disimpan';
  }
}
