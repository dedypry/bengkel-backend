import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('province', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.timestamps(true, true);
  });
  await knex.schema.createTable('city', (table) => {
    table.increments('id').primary();
    table.integer('province_id').references('id').inTable('province');
    table.string('name');
    table.timestamps(true, true);
  });
  await knex.schema.createTable('district', (table) => {
    table.increments('id').primary();
    table.integer('city_id').references('id').inTable('city');
    table.string('name');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('province');
  await knex.schema.dropTableIfExists('district');
  await knex.schema.dropTableIfExists('city');
}
