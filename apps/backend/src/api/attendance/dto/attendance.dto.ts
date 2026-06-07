import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ManualAttendanceDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.number().required())
  user_id!: number;

  @JoiSchema(
    Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
  )
  date!: string;

  // Format jam "HH:mm" atau "HH:mm:ss"
  @JoiSchema(
    Joi.string()
      .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
      .optional()
      .allow(null, ''),
  )
  check_in?: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
      .optional()
      .allow(null, ''),
  )
  check_out?: string;

  @JoiSchema(
    Joi.string()
      .valid('present', 'late', 'absent', 'leave', 'sick', 'permit', 'holiday')
      .optional()
      .allow(null, ''),
  )
  status?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  note?: string;
}

export class AttendanceQueryDto extends IQuery {
  @JoiSchema(Joi.string().optional().allow(null, ''))
  date?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  start_date?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  end_date?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  status?: string;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class DeviceDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.string().required())
  serial_number!: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  name?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  location?: string;

  @JoiSchema(Joi.bool().optional().allow(null))
  is_active?: boolean;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class MapPinDto {
  @JoiSchema(Joi.number().required())
  user_id!: number;

  @JoiSchema(Joi.string().required())
  pin!: string;
}
