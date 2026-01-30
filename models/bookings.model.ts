import { BelongsToOne, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { VehiclesModel } from './vehicles.model';

@Table('bookings', { softDelete: true })
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

  @BelongsToOne(() => VehiclesModel, {
    from: 'vehicle_id',
  })
  vehicle?: VehiclesModel;
}
