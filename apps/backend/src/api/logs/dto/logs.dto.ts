import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class LogsQueryDto {
  @JoiSchema(Joi.string().optional().allow('', null))
  start_at?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  end_at?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  search?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  action?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  url?: string;

  @JoiSchema(Joi.string().optional().allow('', null).valid('success', 'error'))
  status?: string;

  page?: number;
  pageSize?: number;
}
