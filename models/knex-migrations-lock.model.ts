import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('knex_migrations_lock')
export class KnexMigrationsLockModel extends BaseModel {
  // === FIELD START ===
  index: number;
  is_locked?: number;
  // === FIELD END ===
}
