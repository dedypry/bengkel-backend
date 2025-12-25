import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('personal_access_token')
export class PersonalAccessTokenModel extends BaseModel {
  user_id: number;
  name?: string | null;
  token?: string | null;
  exp_at: string;
}
