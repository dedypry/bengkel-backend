import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { UsersModel } from './users.model';
import { AttendanceDevicesModel } from './attendance-devices.model';

@Table('attendance_logs')
export class AttendanceLogsModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  device_id?: number;
  serial_number?: string;
  pin?: string;
  user_id?: number;
  punch_time!: string;
  status?: string;
  verify_mode?: string;
  work_code?: string;
  source?: string;
  raw?: string;
  // === FIELD END ===

  @BelongsToOne(() => UsersModel, {
    from: 'user_id',
  })
  user?: UsersModel;

  @BelongsToOne(() => AttendanceDevicesModel, {
    from: 'device_id',
  })
  device?: AttendanceDevicesModel;
}
