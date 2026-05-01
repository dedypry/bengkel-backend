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
  code!: string;

  @JoiSchema(Joi.string().required())
  name!: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  description?: string;

  @JoiSchema(Joi.number().required())
  category_id!: number;

  @JoiSchema(Joi.number().precision(2).min(0).required())
  purchase_price!: number;

  @JoiSchema(Joi.number().precision(2).min(0).required())
  sell_price!: number;

  @JoiSchema(Joi.number().min(0).required())
  stock!: number;

  @JoiSchema(Joi.number().min(0).required())
  min_stock!: number;

  @JoiSchema(Joi.number().required())
  uom_id!: number;

  @JoiSchema(Joi.string().allow('', null).optional())
  location?: string;

  @JoiSchema(Joi.boolean().default(true))
  is_active!: boolean;

  @JoiSchema(Joi.array().items(Joi.string().uri()).optional())
  images!: string[];
}

export class ProductQueryDto extends IQuery {
  categoryId?: number;

  noStats?: number;
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
  poNumber!: string;

  @JoiSchema(Joi.number().optional())
  id?: number;

  @JoiSchema(Joi.number().integer().required())
  supplierId!: number;

  @JoiSchema(Joi.date().iso().required())
  receiptDate!: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  suratJalanNumber?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  driverName?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  policeNumber?: string; // License Plate

  @JoiSchema(Joi.string().optional().allow(null, ''))
  expedition?: string;

  @JoiSchema(Joi.string().allow('', null).optional())
  notes?: string;

  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          id: Joi.number().optional(),
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
  items!: ReceiptItemDto[];
}

export class ReceiptItemDto {
  id?: number;
  productId!: number;
  qtyPo!: number;
  qtyRec!: number;
  purchasePrice!: number;
  condition!: string;
}

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateStockDto {
  @JoiSchema(Joi.number().required())
  stock!: number;
}
