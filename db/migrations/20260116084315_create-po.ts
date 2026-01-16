import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('goods_receipts', (table) => {
    table.increments('id').primary();
    table.string('grn_number');
    table.string('po_number');
    table.integer('supplier_id').references('id').inTable('suppliers');
    table.integer('received_id').references('id').inTable('users');
    table.timestamp('receipt_at');
    table.integer('verify_id').references('id').inTable('users');
    table.timestamp('verify_at');
    table.string('delivery_note_no');
    table.string('expedition');
    table.string('driver_name');
    table.string('license_plate');
    table.text('notes');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
  await knex.schema.createTable('goods_receipt_items', (table) => {
    table.increments('id').primary();
    table
      .integer('goods_receipt_id')
      .references('id')
      .inTable('goods_receipts');
    table.integer('product_id').references('id').inTable('products');
    table.string('condition');
    table.integer('qty_po').defaultTo(0);
    table.integer('qty_receipt').defaultTo(0);
    table.decimal('purchase_price', 18, 2).defaultTo(0);
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('goods_receipts');
  await knex.schema.dropTableIfExists('goods_receipt_items');
}
