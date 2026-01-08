import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('mechanic_work', (table) => {
    table.increments('id').primary();
    table.integer('work_order_id');
    table.integer('mechanic_id');
    table.string('status');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('mechanic_work');
}
