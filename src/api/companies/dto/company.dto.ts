import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCompanyDto {
  @JoiSchema(Joi.number().allow('', null).optional())
  id?: number;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().required())
  logo_url?: string;

  @JoiSchema(Joi.string().email().required())
  email?: string;

  @JoiSchema(
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
      .min(10),
  )
  phone_number?: string;

  @JoiSchema(Joi.number().allow('', null).optional())
  fax?: string;

  @JoiSchema(Joi.number().allow('', null).optional())
  npwp?: string;
}
