import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateVehiclesDto {
  @JoiSchema(
    Joi.object({
      id: Joi.number().optional().allow('', null),
      current_km: Joi.number().min(0).required().messages({
        'number.base': 'KM tidak boleh negatif',
        'number.min': 'KM tidak boleh negatif',
        'any.required': 'KM tidak boleh negatif',
      }),
      next_km: Joi.number().min(0).required().messages({
        'number.base': 'KM tidak boleh negatif',
        'number.min': 'KM tidak boleh negatif',
        'any.required': 'KM tidak boleh negatif',
      }),
    }).required(),
  )
  wo: {
    id?: number;
    current_km: number;
    next_km: number;
  };

  @JoiSchema(
    Joi.object({
      id: Joi.number().optional().allow('', null),
      plate_number: Joi.string().trim().uppercase().min(4).required().messages({
        'string.empty': 'Nopol wajib diisi',
        'any.required': 'Nopol wajib diisi',
        'string.min': 'Nopol tidak valid',
      }),
      brand: Joi.string().trim().uppercase().min(1).required().messages({
        'string.empty': 'Merk wajib diisi',
        'any.required': 'Merk wajib diisi',
        'string.min': 'Merk wajib diisi',
      }),
      model: Joi.string().trim().uppercase().min(1).required().messages({
        'string.empty': 'Tipe wajib diisi',
        'any.required': 'Tipe wajib diisi',
        'string.min': 'Tipe wajib diisi',
      }),
      year: Joi.string().optional().allow('', null),
      color: Joi.string().optional().allow('', null),
      engine_capacity: Joi.string().optional().allow('', null),
      transmission_type: Joi.string().optional().allow('', null),
      fuel_type: Joi.string().optional().allow('', null),
      vin_number: Joi.string().optional().allow('', null),
      engine_number: Joi.string().optional().allow('', null),
      tire_size: Joi.string().optional().allow('', null),
    }).required(),
  )
  vehicle: {
    id?: number;
    plate_number: string;
    brand: string;
    model: string;
    year?: string;
    color?: string;
    engine_capacity?: string;
    transmission_type?: string;
    fuel_type?: string;
    vin_number?: string;
    engine_number?: string;
    tire_size?: string;
  };
}
