import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    UPDATE work_orders
    SET created_at = (
      date_trunc('day', created_at AT TIME ZONE 'Asia/Jakarta')
      + (
        CASE
          WHEN start_at IS NOT NULL THEN (start_at AT TIME ZONE 'Asia/Jakarta')::time
          ELSE (updated_at AT TIME ZONE 'Asia/Jakarta')::time
        END
      )
    ) AT TIME ZONE 'Asia/Jakarta'
    WHERE deleted_at IS NULL
      AND created_at IS NOT NULL
      AND updated_at IS NOT NULL
      AND created_at = date_trunc('day', created_at)
      AND (created_at AT TIME ZONE 'Asia/Jakarta')::date =
        (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta')::date
  `);
}
