import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateServiceDto {
  id?: number;
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().required())
  code: string;

  @JoiSchema(Joi.number().required())
  price: string;

  @JoiSchema(Joi.number().required())
  estimated_duration: string;

  @JoiSchema(Joi.string().required())
  difficulty: string;

  @JoiSchema(Joi.number().required())
  category_id: string;

  description: string;
}
