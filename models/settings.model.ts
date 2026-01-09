import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('settings')
export class SettingsModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  key?: string;
  value?: string;
  updated_by?: number;
  // === FIELD END ===
}
