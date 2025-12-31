import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('audit_logs', (table) => {
    table.increments('id').primary();
    table.text('url');
    table.integer('user_id').references('id').inTable('users');
    table.string('action');
    table.jsonb('body');
    table.timestamps(true, true);
  });
  await knex.schema.createTable('user_histories', (table) => {
    table.increments('id').primary();
    table.string('model_name');
    table.integer('model_id');
    table.integer('user_id').references('id').inTable('users');
    table.string('action');
    table.jsonb('body');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('audit_logs');
  await knex.schema.dropTable('user_histories');
}
