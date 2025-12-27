import { Modifier, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import type { AnyQueryBuilder } from 'objection';

@Table('district', { hide: ['created_at', 'updated_at', 'city_id'] })
export class DistrictModel extends BaseModel {
  // === FIELD START ===
  city_id?: number;
  name?: string;
  // === FIELD END ===

  @Modifier()
  list(query: AnyQueryBuilder) {
    query.select('id', 'name');
  }
}
