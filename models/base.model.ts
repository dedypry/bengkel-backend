import { Model } from 'objection';
import config from '../knexfile';
import Knex from 'knex';

const knex = Knex(config);
Model.knex(knex);

export class BaseModel extends Model {
  id: number;
  created_at: string;
  updated_at: string;

  $beforeInsert() {
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
