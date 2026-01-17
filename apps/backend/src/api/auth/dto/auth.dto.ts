import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class AuthDto {
  @JoiSchema(Joi.string().email().required())
  email: string;
  @JoiSchema(Joi.string().required())
  password: string;
}
