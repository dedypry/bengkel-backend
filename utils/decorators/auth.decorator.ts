import 'dotenv/config';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IAuth } from 'utils/interfaces/IAuth';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuth => {
    const req: Request = ctx.switchToHttp().getRequest();

    return (req as any).user;
  },
);
