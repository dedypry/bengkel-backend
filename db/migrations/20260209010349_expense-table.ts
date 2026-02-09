import type { Knex } from 'knex';

const categories = [
  { name: 'Gaji & Bonus Mekanik', color: 'primary' },
  { name: 'Pembelian Suku Cadang', color: 'warning' },
  { name: 'Alat & Perlengkapan Bengkel', color: 'secondary' },
  { name: 'Sewa Tempat & Bangunan', color: 'danger' },
  { name: 'Listrik, Air & Internet', color: 'info' },
  { name: 'Biaya Kebersihan & Keamanan', color: 'default' },
  { name: 'Marketing & Promosi', color: 'success' },
  { name: 'Pajak & Perizinan', color: 'danger' },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('expense_categories', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('color').defaultTo('default');
    table.integer('company_id').unsigned().nullable();

    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.index(['company_id', 'name']);
  });

  await knex.schema.createTable('expenses', (table) => {
    table.increments('id').primary();
    table.string('expense_code').unique().notNullable();
    table.string('title').notNullable();
    table.decimal('amount', 15, 2).notNullable().defaultTo(0);
    table.date('date').notNullable();
    table.text('notes').nullable();

    // Status: 'Proses' atau 'Selesai'
    table.string('status').defaultTo('finish');

    // Relasi
    table
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('expense_categories')
      .onDelete('RESTRICT');

    table.integer('company_id').references('id').inTable('companies');
    table.integer('created_by').references('id').inTable('users');

    table.string('attachment_path').nullable();

    table.timestamps(true, true);

    table.index(['company_id', 'date']);
    table.index('category_id');
  });

  await knex('expense_categories').insert(categories);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('expenses');
  await knex.schema.dropTableIfExists('expense_categories');
}
