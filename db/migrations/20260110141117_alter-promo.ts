import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('promos', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('promos', (table) => {
    table.dropColumn('updated_by');
  });
}
