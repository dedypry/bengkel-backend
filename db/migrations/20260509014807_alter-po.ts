import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dateTime('due_date').nullable();
    table.decimal('due_day', 8, 2).defaultTo(0);
    table.dateTime('received_at').nullable();
    table.integer('received_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('po', (table) => {
    table.dropColumn('due_date');
    table.dropColumn('due_day');
    table.dropColumn('received_at');
    table.dropColumn('received_id');
  });
}
