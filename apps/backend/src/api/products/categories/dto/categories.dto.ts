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
  is_active?: string;
  productFilter?: string;
  subCategoryFilter?: string;
  sortBy?: string;
  sortOrder?: string;
}

export class BulkCategoryUpdateDto {
  @JoiSchema(Joi.number().required())
  categoryId: number;

  @JoiSchema(
    Joi.alternatives().try(
      Joi.string().valid('all'),
      Joi.array().items(Joi.number().required()),
    ),
  )
  productIds: 'all' | number[];
}

export class MoveSubCategoryProductsDto {
  @JoiSchema(Joi.number().required())
  fromCategoryId!: number;

  @JoiSchema(Joi.number().required())
  toCategoryId!: number;
}
