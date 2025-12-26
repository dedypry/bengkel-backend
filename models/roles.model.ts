import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('roles', { hide: ['created_at', 'updated_at'] })
export class RolesModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  description?: string;
  // === FIELD END ===
}
