import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.text('complaints');
    table.text('next_sugestion');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('complaints');
    table.dropColumn('next_sugestion');
  });
}
