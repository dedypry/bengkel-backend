import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('bookings')
export class BookingsModel extends BaseModel {
  // === FIELD START ===
  customer_id: number;
  vehicle_id: number;
  branch_id?: number;
  booking_date: string;
  booking_time: any;
  service_type: string;
  complaint?: string;
  status?: string;
  created_by?: number;
  updated_by?: number;
  // === FIELD END ===
}
