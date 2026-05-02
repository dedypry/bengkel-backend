import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('warehouses', (table) => {
    table.integer('created_id').references('id').inTable('users');
    table.integer('updated_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('warehouses', (table) => {
    table.dropColumn('created_id');
    table.dropColumn('updated_id');
  });
}
