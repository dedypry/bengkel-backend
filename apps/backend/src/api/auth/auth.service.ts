import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto, VerifyCodeDto } from './dto/auth.dto';
import { comparePassword } from 'utils/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PersonalAccessTokenModel } from 'models/personal-access-token.model';
import dayjs from 'dayjs';
import { UsersModel } from 'models/users.model';
import { CustomersModel } from 'models/customers.model';
import { formatPhoneNumber } from 'utils/helpers/format';
import { randomInt } from 'crypto';
import { IAuth } from 'utils/interfaces/IAuth';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(body: AuthDto) {
    const user = await UsersModel.query().findOne('email', body.email);

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

  async profile(auth: IAuth) {
    if (auth.type === 'cs') {
      return await CustomersModel.query()
        .withGraphFetched('[profile]')
        .findById(auth.id);
    }

    return await UsersModel.query()
      .withGraphFetched('[companies.address,profile,roles]')
      .findById(auth.id);
  }

  async loginCustomer(body: AuthDto) {
    const user = await CustomersModel.query()
      .where('email', body.email)
      .orWhere('phone', body.email)
      .first();

    if (!user) throw new NotFoundException();
    const isValid = comparePassword(body.password, user.password || '');

    if (!isValid) throw new ForbiddenException('Email/Password salah');

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
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
}
