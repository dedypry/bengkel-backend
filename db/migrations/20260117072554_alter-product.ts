import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.dropUnique(['code']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.unique(['code']);
  });
}
