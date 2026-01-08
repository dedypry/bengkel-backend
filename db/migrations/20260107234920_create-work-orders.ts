import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_order_items', (table) => {
    table.string('type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_order_items', (table) => {
    table.dropColumn('type');
  });
}
