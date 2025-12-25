import 'dotenv/config';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IAuth } from 'utils/interfaces/IAuth';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuth => {
    const req: Request = ctx.switchToHttp().getRequest();
    let token = req.headers['authorization'] as string;

    if (!token) throw new UnauthorizedException();
    token = token.replaceAll('Bearer ', '');

    try {
      const user = jwt.verify(token, SECRET_KEY);
      console.log('user', user);
      return user;
    } catch (error) {
      console.error(error);
      throw new ForbiddenException();
    }
    console.log(token);
  },
);
