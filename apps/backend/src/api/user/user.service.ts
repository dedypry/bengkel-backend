import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  UpdatePhotoProfileDto,
  UpdateProfileDto,
  UserCompanyDto,
} from './dto/user.dto';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { CompaniesModel } from 'models/companies.model';
import { comparePassword, hashPassword } from 'utils/helpers/bcrypt';
import { ProfilesModel } from 'models/profiles.model';
import { CustomersModel } from 'models/customers.model';
import { PersonalAccessTokenModel } from 'models/personal-access-token.model';
import dayjs from 'dayjs';
import { PusherService } from '../notifications/pusher.service';

@Injectable()
export class UserService {
  constructor(private readonly pusherService: PusherService) {}
  async setCompany(body: UserCompanyDto, auth: IAuth) {
    await UsersModel.query().findById(auth.id).update({
      company_id: body.company_id,
    });

    return await CompaniesModel.query()
      .withGraphFetched('[address]')
      .findById(body.company_id);
  }

  async changePassword(body: ChangePasswordDto, auth: IAuth) {
    const user = await UsersModel.query().findById(auth.id);

    if (!user) throw new NotFoundException('User tidak ditemukan');

    const isValid = comparePassword(body.old_password, user.password);

    if (!isValid) throw new ForbiddenException('Password tidak cocok');

    await user.$query().patch({
      password: hashPassword(body.new_password),
    });

    return 'password berhasil diubah';
  }

  async updateProfile(body: UpdateProfileDto, auth: IAuth) {
    const user = await UsersModel.query().findById(auth.id);

    if (!user) throw new NotFoundException('User tidak ditemukan');
    await user.$query().patch({
      name: body.name,
      email: body.email,
      updated_by: auth.id,
    });

    const profile = await ProfilesModel.query().findOne('user_id', auth.id);
    const profilePayload = {
      user_id: auth.id,
      full_name: body.name,
      phone_number: body.phone,
      photo_url: body.photo,
      gender: body.gender,
      emergency_name: body.emergency_name,
      emergency_contact: body.emergency_contact,
      province_id: body.province_id,
      city_id: body.city_id,
      district_id: body.district_id,
      birth_date: body.birth_date,
      place_birth: body.place_birth,
      updated_by: auth.id,
      address: body.address,
      model: 'users',
    };

    if (profile) {
      await profile.$query().patch(profilePayload);
    } else {
      await ProfilesModel.query().insert(profilePayload);
    }

    return 'data berhasil di ubah';
  }

  async updateCustomerPhotoProfile(body: UpdatePhotoProfileDto, auth: IAuth) {
    const user = await CustomersModel.query().findById(auth.id);

    console.log('USR', user);

    if (!user) throw new NotFoundException('User tidak ditemukan');

    await ProfilesModel.query()
      .update({
        photo_url: body.photo,
      })
      .where('user_id', auth.id)
      .where('model', 'customers');

    return 'Update berhasil';
  }

  async listSessions(auth: IAuth, token: string) {
    const sessions = await PersonalAccessTokenModel.query()
      .where('user_id', auth.id)
      .where('exp_at', '>', dayjs().toISOString())
      .orderBy('last_used_at', 'desc')
      .orderBy('updated_at', 'desc');

    return sessions.map((session) => ({
      id: session.id,
      device_label: session.device_label || 'Perangkat tidak diketahui',
      platform: session.platform || 'desktop',
      browser: session.browser || '-',
      ip_address: session.ip_address || '-',
      last_used_at: session.last_used_at || session.updated_at,
      created_at: session.created_at,
      is_current: session.token === token,
    }));
  }

  async revokeAllSessions(auth: IAuth) {
    const sessions = await PersonalAccessTokenModel.query().where(
      'user_id',
      auth.id,
    );
    const revokedSessionIds = sessions.map((session) => session.id);

    await PersonalAccessTokenModel.query()
      .where('user_id', auth.id)
      .softDelete();

    await this.pusherService.notifyUser(auth.id, 'session.revoked', {
      all: true,
      revoked_session_ids: revokedSessionIds,
    });

    return { message: 'Semua perangkat berhasil logout' };
  }

  async revokeSession(auth: IAuth, sessionId: number, token: string) {
    const session = await PersonalAccessTokenModel.query()
      .where('user_id', auth.id)
      .findById(sessionId);

    if (!session) throw new NotFoundException('Sesi tidak ditemukan');

    const isCurrent = session.token === token;

    await (session.$query() as any).softDelete();

    await this.pusherService.notifyUser(auth.id, 'session.revoked', {
      revoked_session_ids: [sessionId],
    });

    return {
      message: 'Perangkat berhasil logout',
      is_current: isCurrent,
    };
  }

  async revokeCurrentSession(auth: IAuth, token: string) {
    if (!token) {
      return { message: 'Logout berhasil' };
    }

    const session = await PersonalAccessTokenModel.query()
      .where('user_id', auth.id)
      .where('token', token)
      .first();

    if (!session) {
      return { message: 'Sesi sudah berakhir' };
    }

    const sessionId = session.id;

    await (session.$query() as any).softDelete();

    await this.pusherService.notifyUser(auth.id, 'session.revoked', {
      revoked_session_ids: [sessionId],
    });

    return { message: 'Logout berhasil' };
  }
}
