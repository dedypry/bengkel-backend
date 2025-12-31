import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('audit_logs')
export class AuditLogsModel extends BaseModel {
  // === FIELD START ===
  url?: string;
  user_id?: number;
  action?: string;
  body?: any;
  // === FIELD END ===
}