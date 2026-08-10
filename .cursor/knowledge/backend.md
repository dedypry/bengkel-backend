# Backend — pola umum

## Struktur

- API: `apps/backend/src/api/{module}/` (controller, service, dto, module)
- Model: `models/*.model.ts` (Objection, extends BaseModel)
- Migration: `db/migrations/` — Knex, timestamp prefix
- **Migration ESLint:** lihat rule `knex-migrations.mdc` — `down` no-op pakai `void knex; return Promise.resolve();`, jangan `async down` kosong atau `_knex`
- Helper: `utils/helpers/`, service: `utils/services/`
- Timezone default: `Asia/Jakarta` di `utils/helpers/dayjs.ts`

## Konvensi

- DTO validation: Joi via `nestjs-joi`
- Soft delete: `deleted_at` column
- Auth context: `IAuth` dengan `company_id`, `id`
- Pre-commit: lint-staged + ESLint cache (bukan full `pnpm lint`)

## Migration Knex — ESLint no-op `down` — 2026-08-10

- **Masalah:** Pre-commit gagal pada migration data-fix: `_knex` unused + `require-await` pada `async down` kosong.
- **Pola:** `export function down(knex: Knex): Promise<void> { void knex; return Promise.resolve(); }`
- **File:** `db/migrations/20260810143000_fix-work-orders-created-at-time.ts`, `.cursor/rules/knex-migrations.mdc`

## Monorepo

| Repo | Stack |
|------|-------|
| backend | NestJS, PostgreSQL, Redis, Bull |
| bengkel-admin | React, HeroUI, Redux, i18n |
| bengkel-customer | React (member app) |
