import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class QueryNotificationDto {
  page?: number;
  pageSize?: number;
}

export class CreateNotificationDto {
  @JoiSchema(Joi.number().required())
  user_id: number;

  @JoiSchema(Joi.number().required())
  company_id: number;

  @JoiSchema(Joi.string().required())
  type: string;

  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().allow('', null))
  body?: string;

  @JoiSchema(Joi.object().allow(null))
  data?: Record<string, unknown>;
}

export class PusherAuthDto {
  @JoiSchema(Joi.string().required())
  socket_id: string;

  @JoiSchema(Joi.string().required())
  channel_name: string;
}
