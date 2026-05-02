import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.text('closed_notes').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dropColumn('closed_notes');
  });
}
