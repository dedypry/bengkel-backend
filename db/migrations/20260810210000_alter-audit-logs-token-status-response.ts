import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('audit_logs', (table) => {
    table.text('token').nullable();
    table.string('status', 20).nullable();
    table.jsonb('response_message').nullable();
    table.index(['token']);
    table.index(['status']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('audit_logs', (table) => {
    table.dropIndex(['status']);
    table.dropIndex(['token']);
    table.dropColumn('response_message');
    table.dropColumn('status');
    table.dropColumn('token');
  });
}
