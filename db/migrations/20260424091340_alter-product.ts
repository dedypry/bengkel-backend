import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.decimal('stock', 18, 2).alter();
    table.decimal('min_stock', 18, 2).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.integer('stock').alter();
    table.integer('min_stock').alter();
  });
}
