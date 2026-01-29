import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bookings', (table) => {
    table.increments('id').primary();

    // Relasi
    table
      .integer('customer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('customers')
      .onDelete('CASCADE');
    table
      .integer('vehicle_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('vehicles')
      .onDelete('CASCADE');
    table.integer('branch_id').unsigned().nullable(); // Jika bengkel punya banyak cabang

    // Informasi Waktu
    table.date('booking_date').notNullable(); // Tanggal rencana datang
    table.time('booking_time').notNullable(); // Jam rencana datang

    // Detail Servis
    table.string('service_type').notNullable(); // Misal: "Service Rutin", "Perbaikan Berat"
    table.text('complaint').nullable(); // Keluhan awal dari user

    // Status Booking
    // PENDING: Baru dibuat, CONFIRMED: Disetujui bengkel,
    // ARRIVED: User sudah datang (siap jadi WO), CANCELLED: Dibatalkan
    table.string('status').defaultTo('PENDING');

    // Metadata
    table.integer('created_by').unsigned().nullable();
    table.integer('updated_by').unsigned().nullable();
    table.timestamps(true, true); // created_at & updated_at

    // Indeks untuk performa query pencarian jadwal
    table.index(['booking_date', 'status']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bookings');
}
