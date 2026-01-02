import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('uoms', { hide: ['company_id', 'created_at', 'updated_at'] })
export class UomsModel extends BaseModel {
  // === FIELD START ===
  code?: string;
  name?: string;
  description?: string;
  company_id?: number;
  // === FIELD END ===
}
