import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AuthDto,
  VerifyCodeDto,
  SendForgotEmailDto,
  ResetPasswordDto,
  RegisterDto,
} from './dto/auth.dto';
import { comparePassword, hashPassword } from 'utils/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PersonalAccessTokenModel } from 'models/personal-access-token.model';
import dayjs from 'dayjs';
import { UsersModel } from 'models/users.model';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { randomInt } from 'crypto';
import { IAuth } from 'utils/interfaces/IAuth';
import 'dotenv/config';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async login(body: AuthDto) {
    const user = await UsersModel.query()
      .where('email', body.email)
      .orWhere('nik', body.email)
      .first();

    if (!user) throw new NotFoundException();

    const isValid = comparePassword(body.password, user.password!);

    if (!isValid) throw new ForbiddenException('Email/Password salah');

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id,
    };

    const token = await this.jwtService.signAsync(payload);

    await PersonalAccessTokenModel.query().insert({
      exp_at: dayjs().add(1, 'y').toISOString(),
      token,
      name: 'bearer',
      user_id: user.id,
    });

    return {
      access_token: token,
      user: payload,
    };
  }

  async register(body: RegisterDto) {
    const find = await CustomersModel.query()
      .where('email', body.email)
      .where('phone', body.phone)
      .first();

    if (find) throw new BadRequestException('Email/phone sudah ada disystem');

    const user = await CustomersModel.query().insert({
      name: body.fullName,
      email: body.email,
      phone: body.phone,
      password: hashPassword(body.password),
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: 'cs',
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: payload,
    };
  }

  async profile(auth: IAuth) {
    if (auth.type === 'cs') {
      return await CustomersModel.query()
        .withGraphFetched('[profile,vehicles]')
        .findById(auth.id);
    }

    const profile = await UsersModel.query()
      .withGraphFetched('[companies.address,profile,roles.permissions]')
      .findById(auth.id);

    const result = {
      ...profile,
      permissions:
        profile?.roles?.flatMap((role) =>
          role.permissions.map((pr) => pr.slug),
        ) || [],
    };
    delete result.password;

    return result;
  }

  async loginCustomer(body: AuthDto) {
    const user = await CustomersModel.query()
      .where('email', body.email)
      .orWhere('phone', formatPhoneNumber(body.email))
      .first();

    if (!user) throw new NotFoundException();
    const isValid = comparePassword(body.password, user.password || '');

    if (!isValid) throw new ForbiddenException('Email/Password salah');

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: 'cs',
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: payload,
    };
  }

  async generateVerifyCode(body: VerifyCodeDto) {
    const user = await CustomersModel.query()
      .where('phone', formatPhoneNumber(body.phone))
      .first();

    if (!user) throw new NotFoundException();

    const code = randomInt(1000, 10000).toString();

    await user.$query().patch({
      code_verify: code,
    });

    return code;
  }

  async verfyCode(body: VerifyCodeDto) {
    const user = await CustomersModel.query()
      .where('phone', formatPhoneNumber(body.phone))
      .first();

    if (!user) throw new NotFoundException();

    if (user.code_verify !== body.code) throw new NotFoundException();

    await user.$query().patch({
      code_verify: '',
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: 'cs',
    };

    const token = await this.jwtService.signAsync(payload);

    await PersonalAccessTokenModel.query().insert({
      exp_at: dayjs().add(1, 'y').toISOString(),
      token,
      name: 'bearer',
      user_id: user.id,
    });

    return {
      access_token: token,
      user: payload,
    };
  }

  async sendForgotEmail(data: SendForgotEmailDto) {
    let user: any = null;
    let url = '';

    const code = randomInt(1000, 10000).toString();
    if (data.type === 'cs') {
      user = await CustomersModel.query()
        .where('email', data.email)
        .orWhere('phone', formatPhoneNumber(data.email))
        .first();

      if (!user || !user.email) throw new NotFoundException();
      await user.$query().patch({
        code_verify: code,
      });

      url = process.env.LANDING_URL + `/reset-password?token=${code}`;
    } else {
      user = await UsersModel.query().where('email', data.email).first();
      if (!user || !user.email) throw new NotFoundException();
      url = process.env.ADMIN_URL + `/reset-password?token=${code}`;
    }

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Reset Password - Clinic Pradana Workshop',
      template: 'forgot-password',
      context: { name: user.name, url },
    });
  }

  async ressetPassword(body: ResetPasswordDto) {
    if (body.type) {
      const user = await CustomersModel.query().findOne(
        'code_verify',
        body.token,
      );

      if (!user) throw new NotFoundException();

      // 1. Ambil waktu sekarang
      const now = dayjs();
      // 2. Ambil waktu update terakhir
      const updatedAt = dayjs(user.updated_at);

      // 3. Cek selisih jam
      const diffInHours = now.diff(updatedAt, 'hour');

      if (diffInHours >= 1) {
        throw new BadRequestException(
          'Kode verifikasi telah kedaluwarsa (lebih dari 1 jam).',
        );
      }
      await user.$query().patch({
        code_verify: '',
        password: hashPassword(body.password),
      });
    }

    return 'Berhasil mengubah password';
  }
}
