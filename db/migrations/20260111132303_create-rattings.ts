import type { Knex } from 'knex';

const tableName = 'mechanic_ratings';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table
      .integer('work_order_id')
      .unsigned()
      .references('id')
      .inTable('work_orders')
      .onDelete('CASCADE');
    table.integer('mechanic_id').unsigned().references('id').inTable('users');

    table.integer('supervisor_id').unsigned().references('id').inTable('users');
    table
      .integer('customer_id')
      .unsigned()
      .references('id')
      .inTable('customers');

    table.decimal('rating', 4, 2).notNullable();
    table.text('notes').nullable();

    table.timestamps(true, true);

    // Indexing untuk performa laporan KPI
    table.index(['mechanic_id', 'created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
