import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateSupplierDto {
  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Nama supplier tidak boleh kosong',
      'any.required': 'Nama supplier wajib diisi',
    }),
  )
  name: string;

  @JoiSchema(Joi.string().allow('', null).empty(''))
  code: string | null;

  @JoiSchema(
    Joi.string().email().allow('', null).messages({
      'string.email': 'Format email tidak valid',
    }),
  )
  email: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .required()
      .messages({
        'string.pattern.base': 'Nomor telepon hanya boleh berisi angka',
        'string.min': 'Nomor telepon minimal 10 digit',
      }),
  )
  phone: string;

  @JoiSchema(Joi.string().allow('', null))
  address: string;

  @JoiSchema(Joi.string().allow('', null))
  npwp: string;

  @JoiSchema(
    Joi.string().uri().allow('', null).messages({
      'string.uri': 'Format website harus berupa URL valid',
    }),
  )
  website: string;

  @JoiSchema(Joi.boolean().default(true))
  is_active: boolean;

  @JoiSchema(Joi.number().allow('', null))
  province_id: number;

  @JoiSchema(Joi.number().allow('', null))
  city_id: number;

  @JoiSchema(
    Joi.number().allow('', null).messages({
      'any.required': 'Kecamatan wajib dipilih',
    }),
  )
  district_id: number;

  @JoiSchema(Joi.number().optional())
  id?: number;
}
