import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
  abortEarly: false, // Agar menampilkan semua error sekaligus
})
export class CreatePromoDto {
  @JoiSchema(Joi.number())
  id: number;

  @JoiSchema(Joi.string().min(3).required())
  name: string;

  @JoiSchema(Joi.string().uppercase().min(3).required())
  code: string;

  @JoiSchema(Joi.string().valid('percentage', 'fixed').required())
  type: string;

  @JoiSchema(Joi.number().min(1).required())
  value: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null, 0))
  max_discount: number;

  @JoiSchema(Joi.date().iso().required())
  start_date: string;

  @JoiSchema(
    Joi.date().iso().min(Joi.ref('start_date')).required().messages({
      'date.min': 'end_date tidak boleh lebih kecil dari start_date',
    }),
  )
  end_date: string;

  @JoiSchema(Joi.number().min(0).default(0))
  min_purchase: number;

  @JoiSchema(Joi.number().integer().min(1).required())
  quota: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  description: string;
}

export class UpdatePromoDto {
  @JoiSchema(Joi.boolean())
  is_active: boolean;
}

export class QueryPromo {
  q?: string;
  status?: 'all' | 'active' | 'end';
}
export class CheckPromo {
  code?: string;
}
