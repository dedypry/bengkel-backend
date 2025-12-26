import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('type').defaultTo('employed');
    table.string('department');
    table.string('status');
    table.integer('company_id').references('id').inTable('companies');
  });
  await knex.schema.alterTable('profiles', (table) => {
    table.timestamp('join_date');
    table.integer('province_id').references('id').inTable('province');
    table.integer('city_id').references('id').inTable('city');
    table.integer('district_id').references('id').inTable('district');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('profiles', (table) => {
    table.dropForeign(['province_id']);
    table.dropForeign(['city_id']);
    table.dropForeign(['district_id']);
    table.dropColumns('join_date', 'province_id', 'city_id', 'district_id');
  });

  await knex.schema.alterTable('users', (table) => {
    table.dropColumns(
      'type',
      'department',
      'status',
      'is_active',
      'company_id',
    );
  });
}
