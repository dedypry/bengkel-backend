import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema.alterTable('work_orders', (table) => {
    table.boolean('remind_next_service').notNullable().defaultTo(false);
    table.date('next_service_due_date').nullable();
    table.timestamp('next_service_reminder_sent_at').nullable();
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('remind_next_service');
    table.dropColumn('next_service_due_date');
    table.dropColumn('next_service_reminder_sent_at');
  });
}
