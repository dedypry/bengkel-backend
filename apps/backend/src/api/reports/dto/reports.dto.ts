import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class QueryRevenueDto {
  startDate?: string;
  endDate?: string;
}

export class UpdateRevenueTargetDto {
  @JoiSchema(Joi.number().min(0).required())
  target_amount: number;
}

export class QueryFrequentCustomersDto {
  startDate?: string;
  endDate?: string;

  @JoiSchema(Joi.number().integer().min(1).max(100).optional())
  limit?: number;
}
