import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_order_items', (table) => {
    // Menambahkan klausa USING untuk konversi paksa di Postgres
    table.decimal('qty', 18, 2).alter({ alterType: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_order_items', (table) => {
    // Menambahkan klausa USING untuk konversi paksa di Postgres
    table.integer('qty').alter({ alterType: true });
  });
}
