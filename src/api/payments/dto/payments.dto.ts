import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreatePayment {
  @JoiSchema(Joi.number().required())
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

  @JoiSchema(Joi.string().optional().allow('', null))
  proofImage?: string;
}
