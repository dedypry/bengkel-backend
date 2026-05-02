import type { Knex } from 'knex';
import { fn } from 'objection';

const tableName = 'po';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('warehouses', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('code').notNullable().unique();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.string('address').nullable();
    table.string('phone_number').nullable();
    table.string('email').nullable();
    table.string('fax').nullable();
    table.string('npwp').nullable();
    table.integer('province_id').references('id').inTable('province');
    table.integer('city_id').references('id').inTable('city');
    table.integer('district_id').references('id').inTable('district');
    table.string('zipcode').nullable();
    table.string('logo_url').nullable();
    table.string('contact_name').nullable();
    table.string('contact_phone').nullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('code').notNullable().unique();
    table.integer('supplier_id').references('id').inTable('suppliers');
    table
      .integer('warehouse_id')
      .nullable()
      .references('id')
      .inTable('warehouses');
    table.string('date').defaultTo(fn.now());
    table.decimal('sub_total', 18, 2).defaultTo(0);
    table.decimal('other_fee', 18, 2).defaultTo(0);
    table.decimal('disc_value', 18, 2).defaultTo(0);
    table.decimal('ppn_percentage', 18, 2).defaultTo(0);
    table.decimal('total', 18, 2).defaultTo(0);
    table.decimal('term_credit', 18, 2).notNullable().defaultTo(0);
    table.decimal('dp', 18, 2).notNullable().defaultTo(0);
    table.string('payment_method').notNullable().defaultTo('cash');
    table.string('status').notNullable().defaultTo('in_progress');
    table.text('notes').nullable();
    table.integer('signature_id').nullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('po_items', (table) => {
    table.increments('id').primary();
    table.integer('po_id').references('id').inTable(tableName);
    table.integer('product_id').references('id').inTable('products');
    table.decimal('qty', 18, 2).defaultTo(0);
    table.decimal('price', 18, 2).defaultTo(0);
    table.decimal('total', 18, 2).defaultTo(0);
    table.decimal('disc_percentage', 18, 2).defaultTo(0);
    table.decimal('disc_value', 18, 2).defaultTo(0);
    table.decimal('ppn_percentage', 18, 2).defaultTo(0);
    table.decimal('received_qty', 18, 2).defaultTo(0);
    table.decimal('received_total', 18, 2).defaultTo(0);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('po_payments', (table) => {
    table.increments('id').primary();
    table.integer('po_id').references('id').inTable(tableName);
    table.string('date').defaultTo(fn.now());
    table.decimal('amount', 18, 2).defaultTo(0);
    table.string('notes').nullable();
    table.integer('signature_id').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('po_payments');
  await knex.schema.dropTable('po_items');
  await knex.schema.dropTable(tableName);
  await knex.schema.dropTable('warehouses');
}
