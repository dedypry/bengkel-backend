import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('trx_no').index();
    table.integer('ppn').defaultTo(0);
    table.decimal('grand_total', 18, 2).defaultTo(0);
    table.integer('company_id').references('id').inTable('companies');
    table.integer('updated_id').references('id').inTable('users');
    table.timestamps(true, true);
  });
  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table
      .integer('order_id')
      .unsigned() // increments id di knex adalah unsigned
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE') // Jika order dihapus, item ikut terhapus
      .index();
    table.jsonb('data');
    table
      .integer('product_id')
      .references('id')
      .inTable('products')
      .onDelete('RESTRICT') // Jangan hapus produk jika masih ada di history order
      .index();
    table.integer('qty').defaultTo(0);
    table.decimal('price', 18, 2).defaultTo(0);
    table.decimal('total_price', 18, 2).defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
}
