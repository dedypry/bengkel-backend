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
  name!: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  description!: string;

  @JoiSchema(Joi.bool().optional().allow(null))
  is_active!: boolean;

  @JoiSchema(
    Joi.array().items({
      id: Joi.number().optional().allow(null, ''),
      name: Joi.string().required(),
    }),
  )
  subCategories?: CreateCategoryDto[];
}

export class CategoryQueryDto extends IQuery {
  isPaginate?: boolean;
  categoryId?: number;
}
