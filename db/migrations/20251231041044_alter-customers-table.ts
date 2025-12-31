import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.integer('company_id').references('id').inTable('companies');
  });
  await knex.schema.alterTable('vehicles', (table) => {
    table.integer('company_id').references('id').inTable('companies');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.dropColumn('company_id');
  });
  await knex.schema.alterTable('vehicles', (table) => {
    table.dropColumn('company_id');
  });
}
