import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateWarehouseDto {
  @JoiSchema(Joi.number().allow(null, '').optional())
  id?: number;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().allow(null, '').optional())
  address: string;

  @JoiSchema(Joi.string().allow(null, '').optional())
  phone_number: string;

  @JoiSchema(Joi.string().allow(null, '').optional().email())
  email: string;

  @JoiSchema(Joi.string().allow(null, '').optional())
  fax: string;

  @JoiSchema(Joi.string().allow(null, '').optional())
  npwp: string;

  @JoiSchema(Joi.number().allow(null, '').optional())
  province_id: number;

  @JoiSchema(Joi.number().allow(null, '').optional())
  city_id: number;

  @JoiSchema(Joi.number().allow(null, '').optional())
  district_id: number;

  @JoiSchema(Joi.string().allow(null, '').optional())
  zipcode: string;
}
