import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { PersonalAccessTokenModel } from './personal-access-token.model';

export type AuditLogStatus = 'success' | 'error';

@Table('audit_logs')
export class AuditLogsModel extends BaseModel {
  // === FIELD START ===
  url?: string;
  user_id?: number;
  action?: string;
  body?: any;
  token?: string | null;
  status?: AuditLogStatus | null;
  response_message?: any;
  // === FIELD END ===

  session?: PersonalAccessTokenModel;

  static relationMappings = {
    session: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: PersonalAccessTokenModel,
      join: {
        from: 'audit_logs.token',
        to: 'personal_access_token.token',
      },
    },
  };
}
