import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('city')
export class CityModel extends BaseModel {
  // === FIELD START ===
  province_id?: number;
  name?: string;
  // === FIELD END ===
}
