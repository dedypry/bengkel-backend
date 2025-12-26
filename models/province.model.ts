import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('province')
export class ProvinceModel extends BaseModel {
  // === FIELD START ===
  name?: string;
  // === FIELD END ===
}
