import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('promos', (table) => {
    table.decimal('price', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('promos', (table) => {
    table.dropColumn('price');
  });
}
