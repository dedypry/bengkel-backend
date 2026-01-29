import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateProfileDto {
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().required())
  email: string;

  @JoiSchema(Joi.string().required())
  phone: string;

  @JoiSchema(Joi.string().required())
  address: string;

  @JoiSchema(Joi.any().required())
  province_id: string;

  @JoiSchema(Joi.any().required())
  city_id: string;

  @JoiSchema(Joi.any().required())
  district_id: string;
}

export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
