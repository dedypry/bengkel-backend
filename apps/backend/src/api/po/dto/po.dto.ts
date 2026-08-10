import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { IQuery } from 'utils/interfaces/query';

export class CreatePoItemDto {
  id: number;
  code: string;
  name: string;
  unit: string;
  qty: number;
  price: number;
  disc_percentage: number;
  disc_value: number;
  ppn_percentage: number;
  total: number;
}

export class CreatePoDto {
  @JoiSchema(Joi.number().optional().allow(null, ''))
  id?: number;

  @JoiSchema(Joi.number().required())
  supplier_id: number;

  @JoiSchema(Joi.number().optional().allow(null))
  warehouse_id: number;

  @JoiSchema(Joi.string().required())
  date: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  requested_date: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  invoice_no: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  po_no: string;

  @JoiSchema(Joi.string().optional().default('in_progress'))
  status: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  closed_notes: string;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  sub_total: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  other_fee: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  disc_percentage: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  disc_value: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  tax: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  total: number;

  @JoiSchema(Joi.number().optional().default(0).allow(null, ''))
  term_credit: number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  notes: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  due_date?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  payment_type?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  received_at?: string;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  signature_id: number;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  due_days?: number;

  @JoiSchema(
    Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required(),
          code: Joi.string().required(),
          name: Joi.string().required(),
          unit: Joi.string().required(),
          qty: Joi.number().required(),
          price: Joi.number().required(),
          disc_percentage: Joi.number().required(),
          disc_value: Joi.number().required(),
          ppn_percentage: Joi.number().required(),
          total: Joi.number().required(),
        }),
      )
      .required(),
  )
  items: CreatePoItemDto[];
}

export class BulkDownloadPoInvoiceDto {
  @JoiSchema(
    Joi.array().items(Joi.number().integer().positive()).min(1).required(),
  )
  ids!: number[];
}

export class PoQuery extends IQuery {
  @JoiSchema(Joi.string().optional().allow(null, ''))
  date?: string;

  @JoiSchema(Joi.number().optional().allow(null, ''))
  supplier_id?: number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  declare date_from?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  declare date_to?: string;
}
