import Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateRoleDto {
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.number().optional().allow('', null))
  id?: string;

  @JoiSchema(Joi.string().optional().allow('', null))
  description: string;

  @JoiSchema(Joi.array().min(1).required())
  permissionId: number[];
}
