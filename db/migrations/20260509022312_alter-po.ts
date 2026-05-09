import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.string('invoice_no');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dropColumn('invoice_no');
  });
}
