import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('service_categories', (table) => {
    table.integer('company_id').nullable().alter();
    table.unique(['company_id', 'slug']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('service_categories', (table) => {
    table.dropUnique(['company_id', 'slug']);
    table.integer('company_id').nullable().alter();
  });
}
