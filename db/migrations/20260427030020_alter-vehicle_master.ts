import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vehicle_master', (table) => {
    table.integer('updated_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vehicle_master', (table) => {
    table.dropColumn('updated_id');
  });
}
