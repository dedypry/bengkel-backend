import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

export class UserCompanyDto {
  @JoiSchema(Joi.number().required())
  company_id: number;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ChangePasswordDto {
  @JoiSchema(Joi.string().required())
  old_password: string;
  @JoiSchema(Joi.string().required())
  new_password: string;
  @JoiSchema(Joi.string().optional())
  confirm_password: string;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateProfileDto {
  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Nama wajib diisi.',
      'any.required': 'Nama wajib diisi.',
    }),
  )
  name: string;

  @JoiSchema(
    Joi.string().email().required().messages({
      'string.email': 'Format email tidak valid.',
      'string.empty': 'Email wajib diisi.',
    }),
  )
  email: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Nomor telepon wajib diisi.',
    }),
  )
  phone: string;

  @JoiSchema(Joi.any().optional())
  photo?: any;

  @JoiSchema(
    Joi.number().min(1).required().messages({
      'number.base': 'Provinsi wajib diisi',
      'number.min': 'Provinsi wajib diisi',
    }),
  )
  province_id: number;

  @JoiSchema(
    Joi.number().min(1).required().messages({
      'number.base': 'Kota wajib diisi',
      'number.min': 'Kota wajib diisi',
    }),
  )
  city_id: number;

  @JoiSchema(
    Joi.number().min(1).required().messages({
      'number.base': 'Kecamatan wajib diisi',
      'number.min': 'Kecamatan wajib diisi',
    }),
  )
  district_id: number;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Alamat wajib diisi',
    }),
  )
  address: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Jenis Kelamin wajib diisi',
    }),
  )
  gender: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Tempat Lahir wajib diisi',
    }),
  )
  place_birth: string;

  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Tanggal Lahir wajib diisi',
    }),
  )
  birth_date: string;

  // Menggunakan .allow(null, '') untuk menangani nullable().optional()
  @JoiSchema(Joi.string().allow(null, '').optional())
  emergency_name?: string;

  @JoiSchema(Joi.string().allow(null, '').optional())
  emergency_contact?: string;
}

export class UpdatePhotoProfileDto {
  @JoiSchema(Joi.any().optional())
  photo?: any;
}
