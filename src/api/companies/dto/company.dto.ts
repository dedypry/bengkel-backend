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

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateCompanyDto {
  @JoiSchema(Joi.number().required())
  id: number;

  @JoiSchema(Joi.string().min(3).max(100).required())
  name: string;

  @JoiSchema(Joi.string().uri().allow('', null).optional())
  logo_url?: string;

  @JoiSchema(Joi.string().email().required())
  email: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .required(),
  )
  phone_number: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^[0-9]+$/)
      .allow('', null)
      .optional(),
  )
  fax?: string;

  @JoiSchema(
    Joi.string()
      .length(15)
      .pattern(/^[0-9]+$/)
      .allow('', null)
      .optional(),
  )
  npwp?: string;

  @JoiSchema(Joi.boolean().default(false))
  is_ppn: boolean;

  @JoiSchema(
    Joi.number().min(0).max(100).when('is_ppn', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  )
  ppn: number;

  @JoiSchema(Joi.boolean().default(false))
  is_discount_birth_day: boolean;

  @JoiSchema(Joi.number().min(0).optional())
  total_discount_birth_day: number;

  @JoiSchema(Joi.string().valid('percentage', 'fixed').default('percentage'))
  type_discount_birth_day: string;

  @JoiSchema(Joi.number().min(0).optional())
  max_discount_birth_day: number;

  @JoiSchema(
    Joi.object({
      title: Joi.string().required(),
      province_id: Joi.number().integer().required(),
      city_id: Joi.number().integer().required(),
      district_id: Joi.number().integer().required(),
    }).required(),
  )
  address: {
    title: string;
    province_id: number;
    city_id: number;
    district_id: number;
  };
}
