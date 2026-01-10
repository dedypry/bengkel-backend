import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.decimal('max_discount_birth_day', 18, 2).defaultTo(0);
    table.string('type_discount_birth_day');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.dropColumn('max_discount_birth_day');
    table.dropColumn('type_discount_birth_day');
  });
}
