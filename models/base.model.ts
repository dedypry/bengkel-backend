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
    await this.saveHistory('INSERT', queryContext);
  }

  async $afterUpdate(opt: any, queryContext: any) {
    await this.saveHistory('UPDATE', queryContext);
  }

  async $afterDelete(queryContext: any) {
    await this.saveHistory('DELETE', queryContext);
  }

  private async saveHistory(action: string, queryContext: any) {
    const knex = (this.constructor as typeof BaseModel).knex();
    const userId = (this as any).updated_by;

    if (!userId) {
      return;
    }

    // Hanya log jika updated_by benar-benar users.id (bukan customers.id)
    const userExists = await knex('users').where('id', userId).first('id');

    if (!userExists) {
      return;
    }

    await knex('user_histories').insert({
      model_name: (this.constructor as typeof BaseModel).tableName,
      model_id: this.id,
      user_id: userId,
      action: action,
      body: JSON.stringify(this),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
