import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('key');
    table.text('value');
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.alterTable('payments', (table) => {
    table.dropColumn('invoice_id');
    table.integer('work_order_id').references('id').inTable('work_orders');
  });
  await knex.schema.alterTable('work_orders', (table) => {
    table.jsonb('promo_data');
    table.decimal('promo_amount', 18, 2).defaultTo(0);
  });

  await knex.schema.dropTableIfExists('invoices');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings');
}
