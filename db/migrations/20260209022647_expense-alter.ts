import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('expenses', (table) => {
    table.dropColumn('created_by');
    table.integer('updated_by').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('expenses', (table) => {
    table.dropColumn('updated_by');
  });
}
