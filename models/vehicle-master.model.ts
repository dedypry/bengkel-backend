import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('vehicle_master')
export class VehicleMasterModel extends BaseModel {
  // === FIELD START ===
  type?: string;
  merk?: string;
  cc?: string;
  status?: string;
  updated_id?: number;
  // === FIELD END ===
}
