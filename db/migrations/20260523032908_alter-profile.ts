import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.string('province_name').nullable();
    table.string('city_name').nullable();
    table.string('district_name').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.dropColumn('province_name');
    table.dropColumn('city_name');
    table.dropColumn('district_name');
  });
}
