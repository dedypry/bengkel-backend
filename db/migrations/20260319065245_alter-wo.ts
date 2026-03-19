import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.text('cancel_note');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('cancel_note');
  });
}
