import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('knex_migrations')
export class KnexMigrationsModel extends BaseModel {
  // === FIELD START ===
  name?: string;
  batch?: number;
  migration_time?: string;
  // === FIELD END ===
}
