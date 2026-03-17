import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.decimal('other_fee', 18, 2).defaultTo(0);
    table.decimal('disc_percentage', 18, 2).defaultTo(0);
    table.decimal('disc_value', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('other_fee');
    table.dropColumn('disc_percentage');
    table.dropColumn('disc_value');
  });
}
