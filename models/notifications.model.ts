import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('notifications', { softDelete: true })
export class NotificationsModel extends BaseModel {
  company_id!: number;
  user_id!: number;
  type!: string;
  title!: string;
  body?: string;
  data?: Record<string, unknown>;
  read_at?: string | null;
}
