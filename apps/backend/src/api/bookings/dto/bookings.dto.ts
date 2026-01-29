import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateBookingDto {
  @JoiSchema(Joi.number().optional())
  id?: number;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Silahkan pilih kendaraan',
      'any.required': 'Silahkan pilih kendaraan',
    }),
  )
  vehicle_id: string;

  @JoiSchema(
    Joi.date()
      .iso()
      .min('now') // Validasi: Minimal hari ini (backend biasanya lebih fleksibel dibanding UI H+1)
      .required()
      .messages({
        'date.base': 'Format tanggal tidak valid',
        'date.min': 'Tanggal booking tidak boleh di masa lalu',
        'any.required': 'Tanggal booking wajib diisi',
      }),
  )
  booking_date: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Jam booking wajib diisi',
      'any.required': 'Jam booking wajib diisi',
    }),
  )
  booking_time: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Pilih jenis servis',
      'any.required': 'Pilih jenis servis',
    }),
  )
  service_type: string;

  @JoiSchema(
    Joi.string().min(5).required().messages({
      'string.min': 'Berikan detail keluhan minimal 5 karakter',
      'string.empty': 'Keluhan wajib diisi',
      'any.required': 'Keluhan wajib diisi',
    }),
  )
  complaint: string;
}
