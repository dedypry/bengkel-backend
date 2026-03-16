import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreatePayment {
  @JoiSchema(Joi.number().optional())
  woId: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  discount: number;

  @JoiSchema(Joi.boolean())
  isManualDiscount: boolean;

  @JoiSchema(Joi.string().required().valid('CASH', 'TRANSFER'))
  paymentMethod: boolean;

  @JoiSchema(Joi.string().optional().allow('', null))
  promoCode?: string;

  @JoiSchema(Joi.number().optional().allow('', null))
  receivedAmount?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  tax?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  subTotal?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  otherFee?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  total?: number;

  @JoiSchema(Joi.number().optional().allow('', null))
  customerId?: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  poNo?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  proofImage?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  type?: string;

  @JoiSchema(Joi.array().optional().allow('', null))
  products?: {
    id: number;
    qty: number;
    price: number;
    total_price: number;
    tax: number;
    disc_percentage: number;
    disc_value: number;
  }[];
}
