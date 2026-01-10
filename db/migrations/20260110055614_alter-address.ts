import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('address', (table) => {
    table.integer('province_id').references('id').inTable('province');
    table.integer('city_id').references('id').inTable('city');
    table.integer('district_id').references('id').inTable('district');

    table.dropColumns('province', 'city', 'district');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('address', (table) => {
    table.dropColumns('province_id', 'city_id', 'district_id');
  });
}
