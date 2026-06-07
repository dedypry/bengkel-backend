import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Kolom PIN mesin absensi pada tabel users (mapping karyawan <-> mesin)
  const hasMachinePin = await knex.schema.hasColumn('users', 'machine_pin');
  if (!hasMachinePin) {
    await knex.schema.alterTable('users', (table) => {
      table.string('machine_pin').nullable().index();
    });
  }

  // Mesin absensi (ADMS device) yang terdaftar
  await knex.schema.createTable('attendance_devices', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('serial_number').notNullable().unique();
    table.string('name').nullable();
    table.string('location').nullable();
    table.string('ip_address').nullable();
    table.string('firmware').nullable();
    table.timestamp('last_seen_at').nullable();
    table.boolean('is_active').defaultTo(true);

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.index(['company_id']);
  });

  // Log mentah setiap kali "punch" diterima dari mesin / input manual
  await knex.schema.createTable('attendance_logs', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table
      .integer('device_id')
      .nullable()
      .references('id')
      .inTable('attendance_devices')
      .onDelete('SET NULL');
    table.string('serial_number').nullable();
    table.string('pin').nullable(); // user id pada mesin
    table
      .integer('user_id')
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.timestamp('punch_time').notNullable();
    table.string('status').nullable(); // 0=in,1=out, dst (status check mesin)
    table.string('verify_mode').nullable(); // 1=fingerprint,15=face, dst
    table.string('work_code').nullable();
    table.string('source').defaultTo('machine'); // machine | manual
    table.text('raw').nullable();

    table.timestamps(true, true);

    table.index(['company_id', 'punch_time']);
    table.index(['serial_number']);
    table.index(['user_id']);
  });

  // Rekap absensi harian per karyawan
  await knex.schema.createTable('attendances', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.date('date').notNullable();
    table.timestamp('check_in').nullable();
    table.timestamp('check_out').nullable();
    // present | late | absent | leave | sick | permit | holiday
    table.string('status').defaultTo('present');
    table.integer('work_minutes').nullable();
    table.string('source').defaultTo('machine'); // machine | manual
    table.text('note').nullable();
    table.integer('created_by').references('id').inTable('users');
    table.integer('updated_by').references('id').inTable('users');

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.unique(['company_id', 'user_id', 'date']);
    table.index(['company_id', 'date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('attendances');
  await knex.schema.dropTableIfExists('attendance_logs');
  await knex.schema.dropTableIfExists('attendance_devices');

  const hasMachinePin = await knex.schema.hasColumn('users', 'machine_pin');
  if (hasMachinePin) {
    await knex.schema.alterTable('users', (table) => {
      table.dropColumn('machine_pin');
    });
  }
}
