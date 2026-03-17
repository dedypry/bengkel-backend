import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('orders', (table) => {
    table.integer('signature_id').references('id').inTable('users');
    table.text('notes');
    table.decimal('dic_percentage', 18, 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('signature_id');
    table.dropColumn('notes');
  });
}
