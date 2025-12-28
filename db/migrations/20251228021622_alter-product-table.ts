import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('product_categories', (table) => {
    table.timestamp('deleted_at');
  });
  await knex.schema.alterTable('suppliers', (table) => {
    table.timestamp('deleted_at');
  });
  await knex.schema.alterTable('products', (table) => {
    table.timestamp('deleted_at');
  });
  await knex.schema.alterTable('images', (table) => {
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('product_categories', (table) => {
    table.dropColumn('deleted_at');
  });
  await knex.schema.alterTable('suppliers', (table) => {
    table.dropColumn('deleted_at');
  });
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('deleted_at');
  });
  await knex.schema.alterTable('images', (table) => {
    table.dropColumn('deleted_at');
  });
}
