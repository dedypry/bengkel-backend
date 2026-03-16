import type { Knex } from 'knex';

const tableName = 'order_items';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.decimal('tax', 18, 2).defaultTo(0);
    table.decimal('disc_percentage', 18, 2).defaultTo(0);
    table.decimal('disc_value', 18, 2).defaultTo(0);
  });

  await knex.schema.alterTable('orders', (table) => {
    table.integer('customer_id').references('id').inTable('customers');
    table.string('po_no');
    table.decimal('other_fee', 18, 2).defaultTo(0);
    table.decimal('subtotal', 18, 2).defaultTo(0);
    table.decimal('tax', 18, 2).defaultTo(0);
    table.decimal('discount', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('tax');
    table.dropColumn('disc_percentage');
    table.dropColumn('disc_value');
  });
}
