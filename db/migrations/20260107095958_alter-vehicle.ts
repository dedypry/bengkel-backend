import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vehicles', (table) => {
    table.string('color');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('vehicles', (table) => {
    table.dropColumn('color');
  });
}
