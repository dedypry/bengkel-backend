import { Model } from 'objection';
import config from '../knexfile';
import Knex from 'knex';

const knex = Knex(config);
Model.knex(knex);

export class BaseModel extends Model {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  static get userContext() {
    return (this as any).queryContext()?.user;
  }

  $beforeInsert() {
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  async $afterInsert(queryContext: any) {
    await this.saveHistory('POST', queryContext);
  }

  async $afterUpdate(opt: any, queryContext: any) {
    await this.saveHistory('UPDATE', queryContext);
  }

  async $afterDelete(queryContext: any) {
    await this.saveHistory('DELETE', queryContext);
  }

  private async saveHistory(action: string, queryContext: any) {
    const knex = (this.constructor as typeof BaseModel).knex();

    if ((this as any).updated_by) {
      console.log(this);
      await knex('user_histories').insert({
        model_name: (this.constructor as typeof BaseModel).tableName,
        model_id: this.id,
        user_id: (this as any).updated_by || null,
        action: action,
        body: JSON.stringify(this), // Menyimpan seluruh object yang diproses
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  }
}
