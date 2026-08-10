import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class IQuery {
  @JoiSchema(Joi.number().default(0))
  page: number;

  @JoiSchema(Joi.number().default(10))
  pageSize: number;

  @JoiSchema(Joi.number().default(0))
  noPaginate: number;

  q?: string;
  id?: string;
  min_rating?: number;
  date_from?: string;
  date_to?: string;
  customer_id?: number | string;
  cashier_id?: number | string;
}
