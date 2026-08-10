import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('personal_access_token', (table) => {
    table.string('device_label').nullable();
    table.string('platform').nullable();
    table.string('browser').nullable();
    table.string('ip_address').nullable();
    table.text('user_agent').nullable();
    table.timestamp('last_used_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('personal_access_token', (table) => {
    table.dropColumn('device_label');
    table.dropColumn('platform');
    table.dropColumn('browser');
    table.dropColumn('ip_address');
    table.dropColumn('user_agent');
    table.dropColumn('last_used_at');
  });
}
