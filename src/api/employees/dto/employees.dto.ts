import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

/**
 * Interface untuk data User/Karyawan Bengkel
 */
export class EmployeeDto {
  id?: number;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().email().required())
  email: string;

  @JoiSchema(Joi.string().required())
  phone: string;

  @JoiSchema(Joi.number().required())
  role_id: number;

  @JoiSchema(Joi.string().required())
  department: string;

  @JoiSchema(Joi.string().required())
  join_date: string; // ISO Date String

  @JoiSchema(
    Joi.string().valid('Permanent', 'Contract', 'Probation').required(),
  )
  status: 'Permanent' | 'Contract' | 'Probation';
  photo: IUserPhoto;

  @JoiSchema(Joi.number().required())
  province_id: number;

  @JoiSchema(Joi.number().required())
  city_id: number;

  @JoiSchema(Joi.number().required())
  district_id: number;

  address: string;

  emergency_contact?: string;
  emergency_name?: string;

  @JoiSchema(Joi.string().required())
  gender: string;

  @JoiSchema(Joi.string().required())
  birth_date: string;

  @JoiSchema(Joi.string().required())
  place_birth: string;
}

/**
 * Interface untuk handle objek foto
 * Berdasarkan JSON Anda yang memiliki key "0", ini biasanya format dari FileList atau objek dari upload
 */
export interface IUserPhoto {
  [key: string]: any; // Menangani dynamic key seperti "0", "1", dst
}
