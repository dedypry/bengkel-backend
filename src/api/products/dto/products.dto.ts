import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

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

export class ProductQueryDto extends IQuery {
  categoryId?: number;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ProductReceiptDto {
  @JoiSchema(
    Joi.string().required().messages({
      'string.empty': 'Purchase Order number is required',
    }),
  )
  poNumber: string;

  @JoiSchema(Joi.number().integer().required())
  supplierId: number;

  @JoiSchema(Joi.date().iso().required())
  receiptDate: string;

  @JoiSchema(Joi.string().required())
  suratJalanNumber: string; // Delivery Note Number

  @JoiSchema(Joi.string().required())
  policeNumber: string; // License Plate

  @JoiSchema(Joi.string().required())
  expedition: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  notes: string;

  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().integer().required(),
          qtyPo: Joi.number().min(1).required(),
          qtyRec: Joi.number().min(0).required(),
          purchasePrice: Joi.number().min(0).required(),
          condition: Joi.string().valid('Baik', 'Rusak', 'Kurang').required(),
        }),
      )
      .min(1)
      .required(),
  )
  items: ReceiptItemDto[];
}

export class ReceiptItemDto {
  productId: number;
  qtyPo: number;
  qtyRec: number;
  purchasePrice: number;
  condition: string;
}
