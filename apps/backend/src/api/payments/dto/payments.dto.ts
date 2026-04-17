import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

function NumVal(value: any) {
  if (
    Number.isNaN(value) ||
    value === null ||
    value === '' ||
    value === 'NaN'
  ) {
    return 0;
  }
  return Number(value);
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreatePayment {
  @JoiSchema(Joi.number().optional())
  woId: number;

  @JoiSchema(Joi.any().optional().custom(NumVal).allow('', null))
  disc_percentage: number;

  @JoiSchema(Joi.number().optional().default(0).allow('', null))
  disc_value: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  signature_id: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  notes: string;

  @JoiSchema(Joi.boolean())
  isManualDiscount: boolean;

  @JoiSchema(Joi.string().required().valid('CASH', 'TRANSFER'))
  payment_method: boolean;

  @JoiSchema(Joi.string().optional().allow('', null))
  promo_code?: string;

  @JoiSchema(Joi.number().optional().allow('', null))
  received_amount?: number;

  @JoiSchema(Joi.number().optional().default(0).allow('', null))
  tax?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  sub_total?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  other_fee?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  total?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  customer_id?: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  po_no?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  proof_image?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  type?: string;

  @JoiSchema(Joi.array().optional().allow('', null))
  products?: {
    id: number;
    product_id: number;
    qty: number;
    price: number;
    total_price: number;
    tax: number;
    disc_percentage: number;
    disc_value: number;
    type: 'service' | 'sparepart';
  }[];

  @JoiSchema(Joi.array().optional().allow('', null))
  services: any[];

  @JoiSchema(Joi.array().optional().allow('', null))
  sparepart: any[];
}
