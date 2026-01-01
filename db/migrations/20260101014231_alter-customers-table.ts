import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.dropColumn('address');
  });
  await knex.schema.alterTable('profiles', (table) => {
    table.string('model').defaultTo('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.string('address');
  });
  await knex.schema.alterTable('profiles', (table) => {
    table.dropColumn('model');
  });
}
