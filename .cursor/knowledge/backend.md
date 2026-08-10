# Backend — pola umum

## Struktur

- API: `apps/backend/src/api/{module}/` (controller, service, dto, module)
- Model: `models/*.model.ts` (Objection, extends BaseModel)
- Migration: `db/migrations/` — Knex, timestamp prefix
- Helper: `utils/helpers/`, service: `utils/services/`
- Timezone default: `Asia/Jakarta` di `utils/helpers/dayjs.ts`

## Konvensi

- DTO validation: Joi via `nestjs-joi`
- Soft delete: `deleted_at` column
- Auth context: `IAuth` dengan `company_id`, `id`
- Pre-commit: lint-staged + ESLint cache (bukan full `pnpm lint`)

## Monorepo

| Repo | Stack |
|------|-------|
| backend | NestJS, PostgreSQL, Redis, Bull |
| bengkel-admin | React, HeroUI, Redux, i18n |
| bengkel-customer | React (member app) |
