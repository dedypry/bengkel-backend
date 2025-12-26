import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.date('birth_date');
    table.string('place_birth');
  });
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('join_date');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.dropColumns('birth_date', 'place_birth');
  });
  await knex.schema.alterTable('users', (table) => {
    table.timestamp('join_date');
  });
}
