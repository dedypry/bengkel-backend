import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';

@Table('attendances', { softDelete: true })
export class AttendancesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  user_id!: number;
  date!: string;
  check_in?: string;
  check_out?: string;
  status?: string;
  work_minutes?: number;
  source?: string;
  note?: string;
  created_by?: number;
  updated_by?: number;
  // === FIELD END ===

  @BelongsToOne(() => UsersModel, {
    from: 'user_id',
  })
  user?: UsersModel;
}
