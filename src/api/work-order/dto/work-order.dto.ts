import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';
const WorkOrderItemSchema = Joi.object({
  id: Joi.number().required(),
  qty: Joi.number().min(1).required(),
  price: Joi.number().min(0).required(),
});
export interface ICustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
  birth_date: string; // ISO Date string
}

export interface IVehicle {
  id: number;
  plate_number: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  engine_capacity: string;
  transmission_type: 'MT' | 'AT' | (string & {});
  fuel_type: string;
  vin_number: string;
  engine_number: string;
  tire_size: string;
}

export interface IWorkOrderItem {
  id: number;
  qty: number;
  price: number;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class WorkOrderRequestDto {
  @JoiSchema(Joi.number().optional().allow('', null))
  id?: number;

  @JoiSchema(
    Joi.object({
      id: Joi.optional(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().allow('', null),
      birth_date: Joi.string().allow('', null),
    }),
  )
  customer: ICustomer;

  @JoiSchema(
    Joi.object({
      id: Joi.optional(),
      plate_number: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.string().required(),
      color: Joi.string().allow('', null),
      engine_capacity: Joi.string().allow('', null),
      transmission_type: Joi.string().allow('', null),
      fuel_type: Joi.string().allow('', null),
      vin_number: Joi.string().allow('', null),
      engine_number: Joi.string().allow('', null),
      tire_size: Joi.string().allow('', null),
    }).required(),
  )
  vehicle: IVehicle;

  @JoiSchema(Joi.number().required())
  current_km: number;

  @JoiSchema(Joi.string().allow('', null))
  complaints: string;

  @JoiSchema(
    Joi.string()
      .valid('low', 'normal', 'high', 'urgent')
      .default('normal')
      .required(),
  )
  priority: 'low' | 'normal' | 'high' | 'urgent';

  @JoiSchema(Joi.array().items(WorkOrderItemSchema).min(1).required())
  services: IWorkOrderItem[];

  @JoiSchema(Joi.array().items(WorkOrderItemSchema).min(1).required())
  sparepart: IWorkOrderItem[];
}

export class WoQuery extends IQuery {
  status?: string;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateStatusWoDto {
  @JoiSchema(
    Joi.string().valid('queue', 'on_progress', 'ready', 'finish').required(),
  )
  progress: string;
}
@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateMechanicWoDto {
  @JoiSchema(Joi.array().min(1).required())
  ids: number[];
}
