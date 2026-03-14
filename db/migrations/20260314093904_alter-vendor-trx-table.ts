import type { Knex } from 'knex';

const tableName = 'vendor_transaction';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.timestamp('date');
  });
  await knex.schema.alterTable('work_orders', (table) => {
    table.integer('pic_id').references('id').inTable('users');
    table.integer('sa_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('date');
  });
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('pic_id');
    table.dropColumn('sa_id');
  });
}
