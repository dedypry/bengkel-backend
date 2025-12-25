import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from 'models/user.model';
import { comparePassword } from 'utils/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PersonalAccessTokenModel } from 'models/personal-access-token.model';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(body: AuthDto) {
    const user = await UserModel.query().findOne('email', body.email);

    if (!user) throw new NotFoundException();

    const isValid = comparePassword(body.password, user.password!);

    if (!isValid) throw new ForbiddenException();

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
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

  async profile(id: number) {
    return await UserModel.query()
      .withGraphFetched('[companies.address,profile]')
      .findById(id);
  }
}
