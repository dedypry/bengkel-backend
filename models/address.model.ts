import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('address', { hide: ['model', 'parent_id'] })
export class AddressModel extends BaseModel {
  parent_id: number;
  model: string; // 'company' | 'user' | dsb
  title?: string | null;
  province?: string | null;
  city?: string | null;
  district?: string | null;
  zip_code?: string | null;
}
