import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // tambahkan kelurahan dalam bahasa inggris
  await knex.schema.alterTable('profiles', (table) => {
    table.string('subdistrict_name').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.dropColumn('subdistrict_name');
  });
}
