import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payments', (table) => {
    table.integer('order_id').references('id').inTable('orders');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payments', (table) => {
    table.dropColumn('order_id');
  });
}
