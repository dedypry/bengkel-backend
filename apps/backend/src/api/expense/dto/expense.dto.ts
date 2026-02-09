import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class ExpenseCreateDto {
  @JoiSchema(Joi.number().optional())
  id?: number;

  @JoiSchema(
    Joi.string().min(3).required().messages({
      'string.min': 'Deskripsi minimal 3 karakter',
      'any.required': 'Deskripsi wajib diisi',
    }),
  )
  title!: string;

  @JoiSchema(
    Joi.alternatives().try(Joi.string(), Joi.number()).required().messages({
      'any.required': 'Pilih kategori',
    }),
  )
  category_id!: string | number;

  @JoiSchema(
    Joi.number().min(1).required().messages({
      'number.min': 'Nominal harus lebih dari 0',
      'any.required': 'Nominal wajib diisi',
    }),
  )
  amount!: number;

  @JoiSchema(
    Joi.string().isoDate().required().messages({
      'any.required': 'Pilih tanggal transaksi',
      'string.isoDate': 'Format tanggal tidak valid',
    }),
  )
  date!: string;

  @JoiSchema(
    Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .optional()
      .allow(null, ''),
  )
  supplier_id?: string | number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  notes?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  attachment_path?: string;
}
