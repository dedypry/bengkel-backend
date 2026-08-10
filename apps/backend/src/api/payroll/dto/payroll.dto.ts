import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { IQuery } from 'utils/interfaces/query';

@JoiSchemaOptions({ allowUnknown: false })
export class SalaryDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.number().required())
  user_id!: number;

  @JoiSchema(Joi.string().valid('monthly', 'weekly', 'daily').required())
  salary_type!: string;

  @JoiSchema(Joi.number().min(0).required())
  base_salary!: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  allowance?: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  deduction?: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  note?: string;

  @JoiSchema(Joi.bool().optional().allow(null))
  is_active?: boolean;
}

@JoiSchemaOptions({ allowUnknown: false })
export class GeneratePayrollDto {
  @JoiSchema(Joi.string().valid('weekly', 'monthly').required())
  period_type!: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
  )
  period_start!: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
  )
  period_end!: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  note?: string;
}

@JoiSchemaOptions({ allowUnknown: false })
export class UpdatePayrollItemDto {
  @JoiSchema(Joi.number().min(0).optional().allow(null))
  base_salary?: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  allowance?: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  overtime_amount?: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  bonus?: number;

  @JoiSchema(Joi.number().min(0).optional().allow(null))
  deduction?: number;

  @JoiSchema(Joi.string().optional().allow('', null))
  note?: string;
}

export class PayrollQueryDto extends IQuery {
  @JoiSchema(Joi.string().optional().allow(null, ''))
  period_type?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  status?: string;
}
