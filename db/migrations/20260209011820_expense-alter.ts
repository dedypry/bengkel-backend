import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('expenses', (table) => {
    table.integer('supplier_id').references('id').inTable('suppliers');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('expenses', (table) => {
    table.dropColumn('supplier_id');
  });
}
