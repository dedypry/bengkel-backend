import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.boolean('is_discount_birth_day').defaultTo(false);
    table.decimal('total_discount_birth_day', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('companies', (table) => {
    table.dropColumns('is_discount_birth_day', 'total_discount_birth_day');
  });
}
