import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class IQuery {
  @JoiSchema(Joi.number().default(0))
  page: number;

  @JoiSchema(Joi.number().default(10))
  pageSize: number;

  q?: string;
}
