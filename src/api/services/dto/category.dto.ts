import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateCategoryDto {
  id?: number;

  @JoiSchema(Joi.string().required())
  name: string;

  description: string;
}
