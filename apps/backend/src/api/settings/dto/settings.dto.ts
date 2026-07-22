import * as Joi from 'joi';
import { JoiSchemaOptions, JoiSchema } from 'nestjs-joi';

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

  @JoiSchema(Joi.number().integer().optional())
  default_pic_id: number;

  @JoiSchema(Joi.number().integer().optional())
  default_advisor_id: number;

  @JoiSchema(Joi.array().optional())
  mechanic_roles: string[];

  @JoiSchema(Joi.string().optional().allow('', null))
  notes_service: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  notes_sales: string;

  @JoiSchema(Joi.array().items(Joi.string()).optional())
  next_service_notes: string[];

  @JoiSchema(Joi.number().integer().min(0).optional())
  next_service_reminder_days: number;

  @JoiSchema(Joi.number().integer().min(1).optional())
  next_service_interval_days: number;

  @JoiSchema(Joi.boolean().optional())
  email_enabled: boolean;

  @JoiSchema(Joi.string().optional().allow('', null))
  smtp_host: string;

  @JoiSchema(Joi.number().integer().min(1).max(65535).optional())
  smtp_port: number;

  @JoiSchema(Joi.boolean().optional())
  smtp_secure: boolean;

  @JoiSchema(Joi.string().optional().allow('', null))
  smtp_user: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  smtp_password: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  smtp_from_name: string;

  @JoiSchema(Joi.string().email().optional().allow('', null))
  smtp_from_email: string;

  @JoiSchema(Joi.boolean().optional())
  email_notify_wo_ready: boolean;

  @JoiSchema(Joi.boolean().optional())
  email_notify_payment_complete: boolean;

  @JoiSchema(Joi.boolean().optional())
  email_notify_invoice: boolean;

  @JoiSchema(Joi.boolean().optional())
  email_notify_next_service: boolean;
}
