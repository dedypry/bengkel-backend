import type { Knex } from 'knex';

const initialSettings = [
  // --- Service Prefixes ---
  { key: 'service_reg_prefix', value: 'PKB.', tag: 'service' },
  { key: 'service_pay_prefix', value: 'SRV.', tag: 'service' },
  { key: 'job_order_prefix', value: 'OPL.', tag: 'service' },

  // --- Direct Sales Prefixes ---
  { key: 'sales_order_prefix', value: 'SO.', tag: 'sales' },
  { key: 'sales_inv_prefix', value: 'SI.', tag: 'sales' },
  { key: 'sales_ret_prefix', value: 'SR.', tag: 'sales' },
  { key: 'ar_pay_prefix', value: 'AR.', tag: 'sales' },

  // --- Operational Defaults ---
  { key: 'default_km_increment', value: '7000', tag: 'operation_default' },
  { key: 'default_cash_account_id', value: '', tag: 'operation_default' },
  { key: 'default_warehouse_id', value: '', tag: 'operation_default' },
  { key: 'pit_count', value: '10', tag: 'operation_default' },

  // --- Service Registration Signatures (Staff IDs) ---
  { key: 'default_pic_id', value: '', tag: 'srs' },
  { key: 'default_advisor_id', value: '', tag: 'srs' },

  // --- Default Notes ---
  {
    key: 'notes_service',
    value: 'Thank you for trusting our workshop.',
    tag: 'notes',
  },
  { key: 'notes_sales', value: 'Items sold are non-refundable.', tag: 'notes' },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('settings', (table) => {
    table.string('header_title');
    table.string('tag');
  });
  await knex.schema.alterTable('work_orders', (table) => {
    table.float('next_km');
  });

  await knex('settings').insert(initialSettings);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('settings', (table) => {
    table.dropColumns('tag', 'header_title');
  });
  await knex.schema.alterTable('work_orders', (table) => {
    table.dropColumn('next_km');
  });
}
