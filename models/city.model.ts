import { Modifier, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import type { AnyQueryBuilder } from 'objection';

@Table('city', { hide: ['created_at', 'updated_at', 'province_id'] })
export class CityModel extends BaseModel {
  // === FIELD START ===
  province_id?: number;
  name?: string;
  // === FIELD END ===

  @Modifier()
  list(query: AnyQueryBuilder) {
    query.select('id', 'name');
  }
}
