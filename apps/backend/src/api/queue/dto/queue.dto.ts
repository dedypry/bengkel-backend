import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

export const QUEUE_STATUS = {
  WAITING: 'WAITING',
  CALLING: 'CALLING',
  PROCESSING: 'PROCESSING',
  SKIP: 'SKIP',
  DONE: 'DONE',
} as const;

@JoiSchemaOptions({ allowUnknown: false })
export class QueueCategoryDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.string().required())
  code!: string;

  @JoiSchema(Joi.string().required())
  name!: string;

  @JoiSchema(Joi.string().required())
  prefix_code!: string;

  @JoiSchema(Joi.number().optional().allow(null))
  estimated_minutes?: number;

  @JoiSchema(Joi.number().optional().allow(null))
  sort_order?: number;

  @JoiSchema(Joi.bool().optional().allow(null))
  is_active?: boolean;
}

@JoiSchemaOptions({ allowUnknown: false })
export class GenerateQueueDto {
  @JoiSchema(Joi.number().required())
  category_id!: number;

  @JoiSchema(Joi.number().optional().allow(null))
  company_id?: number;
}

@JoiSchemaOptions({ allowUnknown: false })
export class NextQueueDto {
  @JoiSchema(Joi.string().optional().allow('', null))
  counter_number?: string;
}

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateQueueStatusDto {
  @JoiSchema(Joi.number().required())
  id!: number;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(QUEUE_STATUS))
      .required(),
  )
  status!: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  counter_number?: string;

  @JoiSchema(Joi.number().optional().allow(null))
  work_order_id?: number;
}

export class QueueQueryDto extends IQuery {
  @JoiSchema(Joi.string().optional().allow('', null))
  date?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  status?: string;

  @JoiSchema(Joi.number().optional().allow(null))
  company_id?: number;
}
