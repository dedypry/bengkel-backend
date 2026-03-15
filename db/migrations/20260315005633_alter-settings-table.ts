import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('settings', (table) => {
    // Membuat index unik gabungan antara key dan company_id
    table.unique(['key', 'company_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('settings', (table) => {
    table.dropUnique(['key', 'company_id']);
  });
}
