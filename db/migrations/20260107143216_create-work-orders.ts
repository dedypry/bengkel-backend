import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('work_orders', (table) => {
    table.increments('id').primary();
    table.string('trx_no').unique();
    table.string('queue_no');
    table.integer('current_km').defaultTo(0);
    table.string('priority').defaultTo('normal');
    table.string('status').defaultTo('draft');
    table.integer('company_id').references('id').inTable('companies');
    table.integer('customer_id').references('id').inTable('customers');
    table.integer('vehicle_id').references('id').inTable('vehicles');
    table.integer('supervisor_id').references('id').inTable('users');
    table.integer('mechanic_id').references('id').inTable('users');
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.index(['queue_no', 'trx_no', 'status', 'company_id']);
  });
  await knex.schema.createTable('work_order_items', (table) => {
    table.increments('id').primary();
    table.jsonb('data');
    table.integer('qty').defaultTo(0);
    table.decimal('price', 18, 2).defaultTo(0);
    table.decimal('total_price', 18, 2).defaultTo(0);
    table.string('priority');
    table.string('status').defaultTo('pending');
    table.integer('work_order_id').references('id').inTable('work_orders');
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });

  await knex.schema.createTable('promos', (table) => {
    table.increments('id').primary();
    table.string('code').unique().notNullable(); // Contoh: TAHUNBARU2026
    table.string('name').notNullable();
    table.enum('type', ['percentage', 'fixed']).defaultTo('fixed'); // Persen atau Potongan harga
    table.decimal('value', 18, 2).defaultTo(0); // Misal: 10 (%) atau 50000 (Rupiah)
    table.decimal('max_discount', 18, 2).nullable(); // Maksimal diskon (jika tipe persentase)
    table.decimal('min_purchase', 18, 2).defaultTo(0); // Syarat minimal belanja
    table.integer('company_id').references('id').inTable('companies');
    table.timestamp('start_date').nullable();
    table.timestamp('end_date').nullable();
    table.integer('quota').defaultTo(0); // Batas berapa kali promo bisa dipakai
    table.integer('used_count').defaultTo(0);

    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('invoices', (table) => {
    table.increments('id').primary();
    table.string('invoice_no').notNullable().unique(); // Contoh: INV/2024/0001
    table
      .integer('work_order_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('work_orders')
      .onDelete('RESTRICT');

    table.decimal('subtotal', 18, 2).defaultTo(0);
    table.decimal('discount', 18, 2).defaultTo(0);
    table.decimal('tax_amount', 18, 2).defaultTo(0); // PPN
    table.decimal('grand_total', 18, 2).defaultTo(0); // Total akhir

    table.string('status').defaultTo('unpaid'); // unpaid, partial, paid, cancelled
    table.text('notes').nullable();
    table.jsonb('promo_data');
    table.decimal('promo_amount', 18, 2).defaultTo(0);
    table
      .integer('company_id')
      .unsigned()
      .references('id')
      .inTable('companies');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });

  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.string('payment_no').notNullable().unique(); // Contoh: PAY/0001
    table
      .integer('invoice_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('invoices')
      .onDelete('CASCADE');

    table.decimal('amount', 18, 2).notNullable();
    table.string('method'); // cash, transfer, EDC, qris
    table.timestamp('payment_date').defaultTo(knex.fn.now());

    table.string('reference_no').nullable(); // Nomor struk EDC atau bukti transfer
    table.string('bank_name').nullable();
    table.text('proof_image').nullable(); // Link ke S3/Storage untuk foto bukti bayar

    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('work_order_items');
  await knex.schema.dropTableIfExists('work_orders');
  await knex.schema.dropTableIfExists('payments');
  await knex.schema.dropTableIfExists('invoices');
}
