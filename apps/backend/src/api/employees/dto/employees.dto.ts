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

  @JoiSchema(Joi.string().optional().allow(null, ''))
  phone: string;

  @JoiSchema(Joi.array().min(1))
  role_ids: number[];

  @JoiSchema(Joi.string().required())
  department: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  join_date: string; // ISO Date String

  @JoiSchema(
    Joi.string().valid('permanent', 'contract', 'probation').required(),
  )
  status: 'permanent' | 'contract' | 'probation';
  photo: IUserPhoto;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  province_id: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  city_id: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  district_id: number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  address: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  emergency_contact?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  emergency_name?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  gender: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  birth_date: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  place_birth: string;
}

/**
 * Interface untuk handle objek foto
 * Berdasarkan JSON Anda yang memiliki key "0", ini biasanya format dari FileList atau objek dari upload
 */
export interface IUserPhoto {
  [key: string]: any; // Menangani dynamic key seperti "0", "1", dst
}
