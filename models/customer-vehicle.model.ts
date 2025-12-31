import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('customer_vehicle')
export class CustomerVehicleModel extends BaseModel {
  // === FIELD START ===
  customer_id?: number;
  vehicle_id?: number;
  // === FIELD END ===
}