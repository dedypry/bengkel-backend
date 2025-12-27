import { Modifier, Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';
import type { AnyQueryBuilder } from 'objection';

@Table('province', { hide: ['created_at', 'updated_at'] })
export class ProvinceModel extends BaseModel {
  // === FIELD START ===
  name?: string;
  // === FIELD END ===

  @Modifier()
  list(query: AnyQueryBuilder) {
    query.select('id', 'name');
  }
}
