import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services', (table) => {
    table.integer('supplier_id').references('id').inTable('suppliers');
  });
  await knex.schema.alterTable('suppliers', (table) => {
    table.integer('province_id').references('id').inTable('province');
    table.integer('city_id').references('id').inTable('city');
    table.integer('district_id').references('id').inTable('district');
    table.string('zipcode');
    table.string('fax_number');
    table.string('website');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services', (table) => {
    table.dropColumn('supplier_id');
  });
}
