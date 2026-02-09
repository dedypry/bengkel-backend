import type { Knex } from 'knex';

const categories = [{ name: 'Lain-lain', color: 'primary' }];
export async function up(knex: Knex): Promise<void> {
  await knex('expense_categories').insert(categories);
}

export async function down(knex: Knex): Promise<void> {
  await knex('expense_categories').insert(categories);
}
