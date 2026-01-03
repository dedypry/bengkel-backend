import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCategoryDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().allow('', null))
  description: string;

  @JoiSchema(Joi.bool().optional().allow(null))
  is_active: boolean;
}

export class CategoryQueryDto extends IQuery {
  isPaginate?: boolean;
  categoryId?: number;
}
