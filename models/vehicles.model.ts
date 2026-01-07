import { ManyToMany, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { CustomersModel } from './customers.model';

@Table('vehicles', { hide: ['company_id', 'updated_by'], softDelete: true })
export class VehiclesModel extends BaseModel {
  // === FIELD START ===
  plate_number: string;
  brand: string;
  model: string;
  year?: string;
  engine_capacity?: string;
  transmission_type?: string;
  fuel_type?: string;
  vin_number?: string;
  engine_number?: string;
  tire_size?: string;
  company_id?: number;
  updated_by?: number;
  color?: string;
  // === FIELD END ===

  @ManyToMany(() => CustomersModel, {
    from: 'vehicle_id',
    to: 'customer_id',
    table: 'customer_vehicle',
  })
  customers?: CustomersModel[];
}
