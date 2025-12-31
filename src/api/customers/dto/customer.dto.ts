import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCustomerDto {
  id?: number;
  @JoiSchema(
    Joi.string().required().messages({ 'any.required': 'Nama wajib diisi' }),
  )
  name: string;

  @JoiSchema(
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
      .min(10),
  )
  phone: string;

  @JoiSchema(Joi.string().email().allow('', null))
  email?: string;

  @JoiSchema(Joi.string().allow('', null))
  address?: string;

  @JoiSchema(Joi.string().valid('personal', 'corporate').default('personal'))
  customer_type: string;

  @JoiSchema(Joi.string().allow('', null))
  nik_ktp?: string;

  @JoiSchema(Joi.number().default(0))
  credit_limit: number;

  @JoiSchema(Joi.string().allow('', null))
  notes?: string;

  // Mendefinisikan Array of Objects untuk Vehicles
  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          plate_number: Joi.string().required().uppercase(),
          brand: Joi.string().required(),
          model: Joi.string().required(),
          year: Joi.string().allow('', null),
          // Nested object untuk Spesifikasi
          engine_capacity: Joi.string().allow('', null),
          transmission_type: Joi.string()
            .valid('MT', 'AT', 'CVT')
            .allow('', null),
          fuel_type: Joi.string().allow('', null),
          vin_number: Joi.string().allow('', null),
          engine_number: Joi.string().allow('', null),
          tire_size: Joi.string().allow('', null),
        }),
      )
      .min(1)
      .required(),
  )
  vehicles: VehicleDto[];
}

// 2. Definisikan Class untuk Kendaraan
export class VehicleDto {
  @JoiSchema(Joi.string().required().uppercase())
  plate_number: string;

  @JoiSchema(Joi.string().required())
  brand: string;

  @JoiSchema(Joi.string().required())
  model: string;

  @JoiSchema(Joi.string().allow('', null))
  year?: string;

  @JoiSchema(Joi.string().allow('', null))
  engine_capacity?: string;

  @JoiSchema(Joi.string().valid('MT', 'AT', 'CVT').allow('', null))
  transmission_type?: string;

  @JoiSchema(Joi.string().allow('', null))
  fuel_type?: string;

  @JoiSchema(Joi.string().allow('', null))
  vin_number?: string;

  @JoiSchema(Joi.string().allow('', null))
  engine_number?: string;

  @JoiSchema(Joi.string().allow('', null))
  tire_size?: string;
}
