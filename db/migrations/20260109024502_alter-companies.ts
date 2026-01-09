import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.boolean('is_ppn').defaultTo(false);
    table.integer('ppn').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.dropColumn('is_ppn');
    table.dropColumn('ppn');
  });
}
