import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

export class CreateServiceDto {
  id?: number;
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().required())
  code: string;

  @JoiSchema(Joi.number().required())
  price: string;

  @JoiSchema(Joi.number().required())
  estimated_duration: string;

  @JoiSchema(Joi.string().required())
  difficulty: string;

  @JoiSchema(Joi.number().required())
  category_id: string;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  supplier_id: string;

  description: string;
}

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateServiceSettingsDTO {
  @JoiSchema(Joi.string().optional())
  service_reg_prefix: string;

  @JoiSchema(Joi.string().optional())
  service_pay_prefix: string;

  @JoiSchema(Joi.string().optional())
  job_order_prefix: string;

  @JoiSchema(Joi.string().optional())
  sales_order_prefix: string;

  @JoiSchema(Joi.string().optional())
  sales_inv_prefix: string;

  @JoiSchema(Joi.string().optional())
  sales_ret_prefix: string;

  @JoiSchema(Joi.string().optional())
  ar_pay_prefix: string;

  @JoiSchema(Joi.number().integer().min(0).default(0))
  default_km_increment: number;

  /** * Mencegah error "invalid input syntax for type integer: ''"
   * Jika value adalah "" atau null, akan dikonversi menjadi null.
   */
  @JoiSchema(
    Joi.alternatives()
      .try(Joi.number().integer(), Joi.string().allow('', null))
      .custom((val) => (val === '' ? null : val))
      .optional(),
  )
  default_cash_account_id: number | null;

  @JoiSchema(
    Joi.alternatives()
      .try(Joi.number().integer(), Joi.string().allow('', null))
      .custom((val) => (val === '' ? null : val))
      .optional(),
  )
  default_warehouse_id: number | null;

  @JoiSchema(Joi.number().integer().optional())
  pit_count: number;
}
