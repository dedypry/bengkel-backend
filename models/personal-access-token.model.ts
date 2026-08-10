import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('personal_access_token')
export class PersonalAccessTokenModel extends BaseModel {
  user_id: number;
  name?: string | null;
  token?: string | null;
  exp_at: string;
  device_label?: string | null;
  platform?: string | null;
  browser?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  last_used_at?: string | null;
}
