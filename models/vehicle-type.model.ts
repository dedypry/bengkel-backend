import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('vehicle_type')
export class VehicleTypeModel extends BaseModel {
  // === FIELD START ===
  type?: string;
  model?: string;
  cc?: string;
  company_id?: number;
  updated_by?: number;
  // === FIELD END ===
}