import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersModel } from 'models/customers.model';
import { UsersModel } from 'models/users.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedException();

    const token = authorization?.replaceAll('Bearer ', '');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      const user =
        payload.type === 'cs'
          ? await CustomersModel.query().findById(payload.id)
          : await UsersModel.query().findById(payload.id);

      if (!user) throw new UnauthorizedException();

      req['user'] = {
        ...user,
        type: payload.type,
      };
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(
        'Token tidak valid atau sudah kadaluwarsa',
      );
    }
  }
}
