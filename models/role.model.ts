import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('roles')
export class RolesModel extends BaseModel {
  name: string;
  slug: string;
  description?: string | null;
}
