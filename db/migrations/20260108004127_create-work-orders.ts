import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.decimal('sparepart_total', 18, 2).defaultTo(0);
    table.decimal('service_total', 18, 2).defaultTo(0);
    table.decimal('sub_total', 18, 2).defaultTo(0);
    table.decimal('grand_total', 18, 2).defaultTo(0);
    table.decimal('ppn_percent', 5, 2).defaultTo(0); // Untuk menyimpan 11.00, 12.00 dll
    table.decimal('ppn_amount', 18, 2).defaultTo(0);
    table.string('progress').defaultTo('pick_up');
    table.decimal('discount_amount', 18, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumns(
      'sparepart_total',
      'service_total',
      'sub_total',
      'total',
      'ppn',
    );
  });
}
