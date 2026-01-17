import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UserCompanyDto {
  @JoiSchema(Joi.number().required())
  company_id: number;
}
