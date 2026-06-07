import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Kolom ID karyawan pada mesin absensi (disesuaikan manual dengan ID di mesin).
  const hasMesinId = await knex.schema.hasColumn('users', 'mesin_id');
  if (!hasMesinId) {
    await knex.schema.alterTable('users', (table) => {
      table.string('mesin_id').nullable().index();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasMesinId = await knex.schema.hasColumn('users', 'mesin_id');
  if (hasMesinId) {
    await knex.schema.alterTable('users', (table) => {
      table.dropColumn('mesin_id');
    });
  }
}
