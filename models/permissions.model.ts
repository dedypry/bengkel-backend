import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('permissions')
export class PermissionsModel extends BaseModel {
  // === FIELD START ===
  name: string;
  slug: string;
  group: string;
  description?: string;
  // === FIELD END ===
}
