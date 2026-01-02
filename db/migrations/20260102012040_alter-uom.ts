import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('uoms', (table) => {
    table.integer('company_id').references('id').inTable('companies');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('uoms', (table) => {
    table.dropColumn('company_id');
  });
}
