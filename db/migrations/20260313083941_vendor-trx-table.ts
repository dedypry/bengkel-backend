import type { Knex } from 'knex';

const tableName = 'vendor_transaction';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.bigIncrements('id').primary();
    table.string('purchase_no');
    table.string('invoice_no');
    table.string('payment_type');
    table.string('payment_method');
    table.integer('due_days');
    table.timestamp('due_date');
    table.integer('signature_id').references('id').inTable('users');
    table.integer('tax').defaultTo(0);
    table.decimal('discount', 18, 2).defaultTo(0);
    table.decimal('other_fees', 18, 2).defaultTo(0);
    table.decimal('subtotal', 18, 2).defaultTo(0);
    table.decimal('total', 18, 2).defaultTo(0);
    table.string('status').defaultTo('pending');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });

  await knex.schema.alterTable('work_order_items', (table) => {
    table.decimal('purchase_price', 18, 2).defaultTo(0);
    table.decimal('disc_percentage', 18, 2).defaultTo(0);
    table.decimal('disc_value', 18, 2).defaultTo(0);
    table.decimal('tax_percentage', 18, 2).defaultTo(0);
    table.decimal('total_payment', 18, 2).defaultTo(0);
    table
      .bigInteger('vendor_transaction_id')
      .references('id')
      .inTable('vendor_transaction');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
  await knex.schema.alterTable('work_order_items', (table) => {
    table.dropColumn('purchase_price');
    table.dropColumn('disc_percentage');
    table.dropColumn('disc_value');
    table.dropColumn('tax_percentage');
    table.dropColumn('total_payment');
    table.dropColumn('vendor_transaction_id');
  });
}
