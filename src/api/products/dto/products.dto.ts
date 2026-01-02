import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateProductDto {
  @JoiSchema(Joi.number())
  id?: number;

  @JoiSchema(
    Joi.string()
      .required()
      .messages({ 'any.required': 'Kode produk wajib diisi' }),
  )
  code: string;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  description?: string;

  @JoiSchema(Joi.number().integer().required())
  category_id: number;

  @JoiSchema(Joi.number().precision(2).min(0).required())
  purchase_price: number;

  @JoiSchema(Joi.number().precision(2).min(0).required())
  sell_price: number;

  @JoiSchema(Joi.number().integer().min(0).required())
  stock: number;

  @JoiSchema(Joi.number().integer().min(0).required())
  min_stock: number;

  @JoiSchema(Joi.number().integer().required())
  uom_id: number;

  @JoiSchema(Joi.string().allow('', null).optional())
  location?: string;

  @JoiSchema(Joi.boolean().default(true))
  is_active: boolean;

  @JoiSchema(
    Joi.array().items(Joi.string().uri()).min(1).required().messages({
      'array.min': 'Minimal harus ada 1 gambar yang diunggah',
      'string.uri': 'Format URL gambar tidak valid',
    }),
  )
  images: string[];
}
