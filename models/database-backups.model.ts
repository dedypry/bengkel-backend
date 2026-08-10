import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';

export type DatabaseBackupStatus = 'processing' | 'ready' | 'failed';

@Table('database_backups')
export class DatabaseBackupsModel extends BaseModel {
  user_id!: number;
  file_name!: string;
  file_path?: string | null;
  file_size?: number | null;
  status!: DatabaseBackupStatus;
  error_message?: string | null;
  completed_at?: string | null;

  @BelongsToOne(() => UsersModel, {
    from: 'user_id',
  })
  user?: UsersModel;
}
