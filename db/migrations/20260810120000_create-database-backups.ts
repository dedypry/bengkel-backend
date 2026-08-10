import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('database_backups', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('file_name').notNullable();
    table.string('file_path').nullable();
    table.bigInteger('file_size').nullable();
    table
      .enum('status', ['processing', 'ready', 'failed'])
      .notNullable()
      .defaultTo('processing');
    table.text('error_message').nullable();
    table.timestamp('completed_at').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('database_backups');
}
