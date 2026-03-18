import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: true, // Izinkan field lain jika ada yang terlewat
})
export class VendorTrxItemDto {
  @JoiSchema(Joi.number().required())
  id: number;

  @JoiSchema(Joi.boolean().optional())
  select: boolean;

  @JoiSchema(Joi.string().required())
  code: string;

  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.number().min(0).required())
  purchasePrice: number;

  @JoiSchema(Joi.number().min(0).default(0))
  discPercentage: number;

  @JoiSchema(Joi.number().min(0).default(0))
  discValue: number;

  @JoiSchema(Joi.number().required())
  total: number;

  @JoiSchema(Joi.number().optional())
  taxPercentage: number;
}

export class CreateVendorTrxDto {
  @JoiSchema(Joi.any().optional())
  id?: string;

  @JoiSchema(Joi.number().required())
  supplierId: string;

  @JoiSchema(Joi.string().required())
  purchaseNo: string;

  @JoiSchema(Joi.string().isoDate().required())
  date: string;

  @JoiSchema(Joi.string().allow('').optional())
  invoiceNo: string;

  @JoiSchema(Joi.string().valid('cash', 'credit', 'transfer').required())
  paymentType: string;

  @JoiSchema(Joi.string().required())
  paymentMethod: string;

  @JoiSchema(Joi.number().integer().min(0).required())
  dueDays: number;

  @JoiSchema(Joi.string().isoDate().required())
  dueDate: string;

  @JoiSchema(
    Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.number().required(),
          select: Joi.boolean().optional(),
          code: Joi.string().required(),
          name: Joi.string().required(),
          purchasePrice: Joi.number().required(),
          discPercentage: Joi.number().optional(),
          discValue: Joi.number().optional(),
          total: Joi.number().required(),
          taxPercentage: Joi.number().required(),
        }),
      )
      .min(1)
      .required(),
  )
  items: VendorTrxItemDto[];

  @JoiSchema(Joi.string().allow('').optional())
  signature: string;

  @JoiSchema(Joi.number().optional())
  signatureId: string;

  @JoiSchema(Joi.number().required())
  subTotal: number;

  @JoiSchema(Joi.number().default(0))
  finalDiscValue: number;

  @JoiSchema(Joi.number().default(0))
  finalDiscPercentage: number;

  @JoiSchema(Joi.number().default(0))
  tax: number;

  @JoiSchema(Joi.number().default(0))
  otherFees: number;

  @JoiSchema(Joi.number().required())
  total: number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  notes?: number;

  @JoiSchema(Joi.any().optional().allow(null, ''))
  paymentMethodData?: any;
}
