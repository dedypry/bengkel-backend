import type { Knex } from 'knex';

const defaultCategories = [
  {
    code: 'A',
    name: 'Servis Rutin / Berkala',
    prefix_code: 'A',
    estimated_minutes: 60,
    sort_order: 1,
  },
  {
    code: 'B',
    name: 'Servis Berat / Turun Mesin',
    prefix_code: 'B',
    estimated_minutes: 240,
    sort_order: 2,
  },
  {
    code: 'C',
    name: 'Fast Track / Ganti Oli & Sparepart',
    prefix_code: 'C',
    estimated_minutes: 20,
    sort_order: 3,
  },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ms_queue_categories', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('code').notNullable();
    table.string('name').notNullable();
    table.string('prefix_code').notNullable();
    table.integer('current_number').notNullable().defaultTo(0);
    table.date('last_reset_date').nullable();
    table.integer('estimated_minutes').notNullable().defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.integer('sort_order').defaultTo(0);
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.unique(['company_id', 'code']);
    table.index(['company_id', 'is_active']);
  });

  await knex.schema.createTable('tr_queues', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies');
    table.string('queue_number').notNullable();
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('ms_queue_categories')
      .onDelete('RESTRICT');
    table.date('queue_date').notNullable();
    table.integer('sequence').notNullable();
    table
      .string('status')
      .notNullable()
      .defaultTo('WAITING')
      .comment('WAITING, CALLING, PROCESSING, SKIP, DONE');
    table.string('counter_number').nullable();
    table.integer('attendant_id').references('id').inTable('users');
    table.integer('work_order_id').references('id').inTable('work_orders');
    table.timestamp('called_at').nullable();
    table.timestamp('started_at').nullable();
    table.timestamp('done_at').nullable();
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);

    table.unique(['company_id', 'queue_date', 'queue_number']);
    table.index(['company_id', 'queue_date', 'status']);
    table.index(['category_id', 'queue_date']);
  });

  const companies = await knex('companies').select('id');

  for (const company of companies) {
    await knex('ms_queue_categories').insert(
      defaultCategories.map((category) => ({
        ...category,
        company_id: company.id,
      })),
    );
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('tr_queues');
  await knex.schema.dropTableIfExists('ms_queue_categories');
}
