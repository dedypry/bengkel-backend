import type { Knex } from 'knex';

const tableName = 'vendor_transaction';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.jsonb('payment_method_data');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('payment_method_data');
  });
}
