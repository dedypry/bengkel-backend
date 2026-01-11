import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('user_histories')
export class UserHistoriesModel extends BaseModel {
  // === FIELD START ===
  model_name?: string;
  model_id?: number;
  user_id?: number;
  action?: string;
  body?: any;
  // === FIELD END ===
}
