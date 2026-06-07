import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Konfigurasi gaji per karyawan
  await knex.schema.createTable('employee_salaries', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    // monthly | weekly | daily
    table.string('salary_type').notNullable().defaultTo('monthly');
    table.decimal('base_salary', 15, 2).notNullable().defaultTo(0);
    table.decimal('allowance', 15, 2).notNullable().defaultTo(0); // tunjangan tetap
    table.decimal('deduction', 15, 2).notNullable().defaultTo(0); // potongan tetap
    table.text('note').nullable();
    table.boolean('is_active').defaultTo(true);
    table.integer('updated_by').references('id').inTable('users');

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.unique(['company_id', 'user_id']);
  });

  // Periode / batch penggajian
  await knex.schema.createTable('payrolls', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('code').notNullable();
    // weekly | monthly
    table.string('period_type').notNullable().defaultTo('monthly');
    table.date('period_start').notNullable();
    table.date('period_end').notNullable();
    // draft | paid
    table.string('status').notNullable().defaultTo('draft');
    table.decimal('total_amount', 15, 2).notNullable().defaultTo(0);
    table.text('note').nullable();
    table.timestamp('paid_at').nullable();
    table.integer('created_by').references('id').inTable('users');
    table.integer('updated_by').references('id').inTable('users');

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.index(['company_id', 'period_type']);
  });

  // Detail gaji per karyawan dalam satu periode
  await knex.schema.createTable('payroll_items', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table
      .integer('payroll_id')
      .notNullable()
      .references('id')
      .inTable('payrolls')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('salary_type').nullable();
    table.decimal('base_salary', 15, 2).notNullable().defaultTo(0);
    table.decimal('allowance', 15, 2).notNullable().defaultTo(0);
    table.decimal('overtime_amount', 15, 2).notNullable().defaultTo(0);
    table.decimal('bonus', 15, 2).notNullable().defaultTo(0);
    table.decimal('deduction', 15, 2).notNullable().defaultTo(0);
    table.decimal('gross', 15, 2).notNullable().defaultTo(0);
    table.decimal('net', 15, 2).notNullable().defaultTo(0);
    table.integer('present_days').defaultTo(0);
    table.integer('absent_days').defaultTo(0);
    table.integer('late_count').defaultTo(0);
    table.text('note').nullable();
    // pending | paid
    table.string('status').notNullable().defaultTo('pending');

    table.timestamps(true, true);

    table.unique(['payroll_id', 'user_id']);
    table.index(['company_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('payroll_items');
  await knex.schema.dropTableIfExists('payrolls');
  await knex.schema.dropTableIfExists('employee_salaries');
}
