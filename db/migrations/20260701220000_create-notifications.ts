import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('companies')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('type').notNullable().defaultTo('info');
    table.string('title').notNullable();
    table.text('body').nullable();
    table.jsonb('data').nullable();
    table.timestamp('read_at').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.index(['user_id', 'company_id']);
    table.index(['user_id', 'read_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notifications');
}
