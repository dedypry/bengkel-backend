import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('service_categories', (table) => {
    table.integer('parent_id');
  });
  await knex.schema.alterTable('services', (table) => {
    table
      .enum('estimated_type', ['minutes', 'hours', 'days'])
      .defaultTo('hours');
    table.decimal('ppn', 10, 2).defaultTo(0);
  });
  await knex.schema.alterTable('products', (table) => {
    table.decimal('ppn', 10, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('service_categories', (table) => {
    table.dropColumn('parent_id');
  });
  await knex.schema.alterTable('services', (table) => {
    table.dropColumn('estimated_type');
  });
}
