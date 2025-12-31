import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('vehicles', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('product_categories', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('suppliers', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('products', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('images', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('service_categories', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('services', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('users', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('profiles', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('companies', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('address', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
  await knex.schema.alterTable('roles', (table) => {
    table.integer('updated_by').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('customers', (table) => {
    table.dropColumn('updated_by');
  });
  await knex.schema.alterTable('vehicles', (table) => {
    table.dropColumn('updated_by');
  });
}
