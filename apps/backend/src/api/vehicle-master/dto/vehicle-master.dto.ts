import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

export class VehicleCreateDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.string().required())
  type: string;

  @JoiSchema(Joi.string().required())
  merk: string;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  cc: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  status: string;
}

export class IQueryVehicles extends IQuery {
  merk: string;
}
