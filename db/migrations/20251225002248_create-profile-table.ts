import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('profiles', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('full_name', 150).notNullable();
    table.string('phone_number', 20).nullable();
    table.text('address').nullable();
    table.enum('gender', ['male', 'female']).nullable();
    table.string('photo_url').nullable();
    table.string('emergency_name', 50).nullable();
    table.string('emergency_contact', 50).nullable();

    table.timestamps(true, true);
  });

  await knex.schema.alterTable('users', (table) => {
    table.string('position').nullable();
    table.date('join_date').nullable();
    table.boolean('is_active').defaultTo(true);
    table.dropColumn('phone_number');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('profiles');
}
