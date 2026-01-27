import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class AuthDto {
  @JoiSchema(Joi.string().required())
  email: string;
  @JoiSchema(Joi.string().required())
  password: string;
}

export class VerifyCodeDto {
  @JoiSchema(Joi.string().required())
  phone: string;

  code: string;
}

export class SendForgotEmailDto {
  @JoiSchema(Joi.string().required())
  email: string;

  @JoiSchema(Joi.string().required())
  type: string;
}
export class ResetPasswordDto {
  @JoiSchema(Joi.string().required())
  password: string;

  @JoiSchema(Joi.string().required())
  token: string;

  @JoiSchema(Joi.string().required())
  type: string;
}
