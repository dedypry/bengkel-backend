import type { Knex } from 'knex';

const tableName = 'vendor_transaction';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.integer('supplier_id').references('id').inTable('suppliers');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('supplier_id');
  });
}
