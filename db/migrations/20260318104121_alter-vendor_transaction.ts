import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vendor_transaction', (table) => {
    table.decimal('disc_percentage', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vendor_transaction', (table) => {
    table.dropColumn('disc_percentage');
  });
}
