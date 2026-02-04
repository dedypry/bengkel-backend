import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    -- =========================
    -- SERVICES
    -- =========================
    ALTER TABLE services
    ADD COLUMN IF NOT EXISTS search_vector tsvector;

    UPDATE services
    SET search_vector =
      to_tsvector('simple', coalesce(name, ''));

    CREATE INDEX IF NOT EXISTS services_search_idx
    ON services
    USING GIN (search_vector);

    CREATE OR REPLACE FUNCTION services_search_vector_update()
    RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        to_tsvector('simple', coalesce(NEW.name, ''));
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS services_search_vector_trigger ON services;

    CREATE TRIGGER services_search_vector_trigger
    BEFORE INSERT OR UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION services_search_vector_update();


    -- =========================
    -- PRODUCTS
    -- =========================
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS search_vector tsvector;

    UPDATE products
    SET search_vector =
      to_tsvector('simple', coalesce(name, ''));

    CREATE INDEX IF NOT EXISTS products_search_idx
    ON products
    USING GIN (search_vector);

    CREATE OR REPLACE FUNCTION products_search_vector_update()
    RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        to_tsvector('simple', coalesce(NEW.name, ''));
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS products_search_vector_trigger ON products;

    CREATE TRIGGER products_search_vector_trigger
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION products_search_vector_update();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    -- SERVICES
    DROP TRIGGER IF EXISTS services_search_vector_trigger ON services;
    DROP FUNCTION IF EXISTS services_search_vector_update;
    DROP INDEX IF EXISTS services_search_idx;
    ALTER TABLE services DROP COLUMN IF EXISTS search_vector;

    -- PRODUCTS
    DROP TRIGGER IF EXISTS products_search_vector_trigger ON products;
    DROP FUNCTION IF EXISTS products_search_vector_update;
    DROP INDEX IF EXISTS products_search_idx;
    ALTER TABLE products DROP COLUMN IF EXISTS search_vector;
  `);
}
