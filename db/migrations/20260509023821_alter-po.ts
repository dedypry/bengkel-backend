import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.string('payment_type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dropColumn('payment_type');
  });
}
