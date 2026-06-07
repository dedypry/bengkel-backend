import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('attendance_devices', { softDelete: true })
export class AttendanceDevicesModel extends BaseModel {
  // === FIELD START ===
  company_id?: number;
  serial_number!: string;
  name?: string;
  location?: string;
  ip_address?: string;
  firmware?: string;
  last_seen_at?: string;
  is_active?: boolean;
  // === FIELD END ===
}
