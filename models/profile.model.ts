import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('profiles')
export class ProfileModel extends BaseModel {
  name: string;
  slug: string;
  description?: string | null;
}
