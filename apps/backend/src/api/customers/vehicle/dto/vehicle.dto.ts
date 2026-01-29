import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false, // Melarang field yang tidak didefinisikan masuk
})
export class CreateVehicleDto {
  @JoiSchema(Joi.number().optional())
  id?: number;

  @JoiSchema(
    Joi.string().required().min(4).messages({
      'string.empty': 'Nopol wajib diisi',
      'string.min': 'Nopol tidak valid (min. 4 karakter)',
      'any.required': 'Nopol wajib diisi',
    }),
  )
  plate_number: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Merk wajib diisi',
      'any.required': 'Merk wajib diisi',
    }),
  )
  brand: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Tipe wajib diisi',
      'any.required': 'Tipe wajib diisi',
    }),
  )
  model: string;

  @JoiSchema(Joi.number().allow('', null).optional())
  year?: number;

  @JoiSchema(Joi.string().allow('', null).optional())
  color?: string;

  @JoiSchema(Joi.number().allow('', null).optional())
  engine_capacity?: number;

  @JoiSchema(Joi.string().valid('CVT', 'AT', 'MT').optional())
  transmission_type?: string;

  @JoiSchema(Joi.string().optional())
  fuel_type?: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  vin_number?: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  engine_number?: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  tire_size?: string;
}
