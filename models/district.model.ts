import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('district')
export class DistrictModel extends BaseModel {
  // === FIELD START ===
  city_id?: number;
  name?: string;
  // === FIELD END ===
}
