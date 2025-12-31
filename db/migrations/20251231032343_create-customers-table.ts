import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('email').nullable();
    table.string('code_verify').nullable();
    table.text('address').nullable();
    table
      .enum('customer_type', ['personal', 'corporate'])
      .defaultTo('personal');
    table.string('nik_ktp', 16).nullable();
    table.decimal('credit_limit', 15, 2).defaultTo(0);
    table.text('notes').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });

  await knex.schema.createTable('vehicles', (table) => {
    table.increments('id').primary();

    table.string('plate_number').notNullable().unique();
    table.string('brand').notNullable();
    table.string('model').notNullable();
    table.string('year', 4).nullable();

    table.string('engine_capacity').nullable(); // misal: 1500
    table.string('transmission_type').nullable(); // MT, AT, CVT
    table.string('fuel_type').nullable();
    table.string('vin_number').nullable();
    table.string('engine_number').nullable();
    table.string('tire_size').nullable();

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });

  await knex.schema.createTable('customer_vehicle', (table) => {
    table.increments('id').primary();
    table.integer('customer_id').references('id').inTable('customers');
    table.integer('vehicle_id').references('id').inTable('vehicles');
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('customers');
  await knex.schema.dropTableIfExists('vehicles');
  await knex.schema.dropTableIfExists('customer_vehicle');
}
