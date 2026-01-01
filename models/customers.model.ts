import {
  HasOne,
  ManyToMany,
  Table,
} from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import { VehiclesModel } from './vehicles.model';
import { ProfilesModel } from './profiles.model';

@Table('customers')
export class CustomersModel extends BaseModel {
  // === FIELD START ===
  name: string;
  phone: string;
  email?: string;
  code_verify?: string;
  customer_type?: string;
  nik_ktp?: string;
  credit_limit?: number;
  notes?: string;
  company_id?: number;
  updated_by?: number;
  status?: string;
  // === FIELD END ===

  @ManyToMany(() => VehiclesModel, {
    from: 'customer_id',
    to: 'vehicle_id',
    table: 'customer_vehicle',
  })
  vehicles?: VehiclesModel[];

  @HasOne(() => ProfilesModel, {
    filter: (query) => query.where('model', 'customers'),
    to: 'user_id',
  })
  profile?: ProfilesModel;
}
