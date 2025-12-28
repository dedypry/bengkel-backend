import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // 1. Tabel Kategori Produk
  await knex.schema.createTable('product_categories', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').unique().notNullable();
    table.integer('company_id').references('id').inTable('companies');
    table.text('description').nullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true); // created_at & updated_at
  });

  // 2. Tabel Supplier
  await knex.schema.createTable('suppliers', (table) => {
    table.increments('id').primary();
    table.string('code').unique().notNullable(); // Contoh: SPL-001
    table.integer('company_id').references('id').inTable('companies');
    table.string('name').notNullable();
    table.string('contact_name').nullable(); // Nama sales/PIC
    table.string('phone').notNullable();
    table.string('email').nullable();
    table.text('address').nullable();
    table.string('npwp').nullable(); // NPWP Supplier
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  // 3. Tabel Produk (Sparepart/Barang)
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('code').unique().notNullable(); // SKU / Part Number
    table.integer('company_id').references('id').inTable('companies');
    table.string('name').notNullable();
    table.string('image');
    table.text('description').nullable();

    // Foreign Keys
    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('product_categories')
      .onDelete('SET NULL');
    table
      .integer('supplier_id')
      .unsigned()
      .references('id')
      .inTable('suppliers')
      .onDelete('SET NULL');

    // Inventory & Pricing
    table.decimal('purchase_price', 15, 2).defaultTo(0); // Harga beli dari supplier
    table.decimal('sell_price', 15, 2).defaultTo(0); // Harga jual ke pelanggan
    table.integer('stock').defaultTo(0);
    table.integer('min_stock').defaultTo(5); // Reorder point
    table.string('unit').defaultTo('Pcs'); // Pcs, Liter, Set
    table.string('location').nullable(); // Posisi di gudang (Rak A1)

    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.string('model');
    table.integer('parent_id');
    table.integer('company_id').references('id').inTable('companies');
    table.string('filename').notNullable(); // Nama file unik (uuid-name.jpg)
    table.string('original_name').notNullable(); // Nama asli file (foto-oli.jpg)
    table.string('mime_type').notNullable(); // image/jpeg, image/png
    table.integer('size').notNullable(); // Ukuran dalam bytes
    table.string('path').notNullable(); // Path penyimpanan atau URL (S3/Local)
    table.boolean('is_primary').defaultTo(false); // Untuk menandai foto profil/utama
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Hapus dengan urutan terbalik untuk menghindari error foreign key constraint
  await knex.schema.dropTableIfExists('images');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('suppliers');
  await knex.schema.dropTableIfExists('product_categories');
}
