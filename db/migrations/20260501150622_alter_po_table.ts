import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.integer('created_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dropColumn('created_id');
  });
}
