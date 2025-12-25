import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').unique().notNullable(); // Untuk URL dashboard unik
    table.string('logo_url').nullable();
    table.string('email').unique().nullable();
    table.string('phone_number').nullable();
    table.string('fax').nullable();
    table.string('npwp').nullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable('address', (table) => {
    table.increments('id').primary();
    table.integer('parent_id').notNullable();
    table.string('model').notNullable();
    table.string('title');
    table.string('province');
    table.string('city');
    table.string('district');
    table.string('zip_code');

    table.timestamps(true, true);
  });

  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').notNullable().unique();
    table.string('description');

    table.timestamps(true, true);
  });

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('nik');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phone_number').nullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable('personal_access_token', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('name');
    table.string('token');
    table.string('exp_at').notNullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable('role_user', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('role_id');

    table.timestamps(true, true);
  });

  await knex.schema.createTable('company_user', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('company_id');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('companies');
  await knex.schema.dropTableIfExists('address');
  await knex.schema.dropTableIfExists('roles');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('personal_access_token');
  await knex.schema.dropTableIfExists('role_user');
  await knex.schema.dropTableIfExists('company_user');
}
