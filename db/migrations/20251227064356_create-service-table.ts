import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('service_categories', (table) => {
    table.increments('id').primary();

    // Relasi ke Perusahaan (Setiap bengkel bisa punya kategori sendiri)
    table
      .integer('company_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('companies')
      .onDelete('CASCADE');

    table.string('name').notNullable(); // Contoh: "Mesin", "Body Repair", "Kelistrikan"
    table.string('slug').nullable(); // Contoh: "mesin", "body-repair"
    table.text('description').nullable();

    // Status aktif
    table.boolean('is_active').defaultTo(true);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    // Indexing
    table.index(['company_id', 'name']);
  });

  await knex.schema.createTable('services', (table) => {
    table.increments('id').primary();
    table
      .integer('company_id')
      .unsigned()
      .references('id')
      .inTable('companies')
      .onDelete('CASCADE');

    table.string('name').notNullable();
    table.string('code').nullable();
    table.text('description').nullable();
    table.decimal('price', 15, 2).defaultTo(0);
    table.integer('estimated_duration').nullable();
    table
      .enum('difficulty', ['easy', 'medium', 'hard', 'extreme'], {
        useNative: true,
        enumName: 'service_difficulty_level',
      })
      .defaultTo('easy');
    table
      .integer('category_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('service_categories')
      .onDelete('SET NULL')
      .after('company_id');
    table.boolean('is_active').defaultTo(true);

    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.index(['company_id', 'name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('service_categories');
  await knex.schema.dropTableIfExists('services');
}
