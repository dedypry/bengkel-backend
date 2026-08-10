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

## personal_access_token soft delete — 2026-08-10

- **Konteks:** Revoke/logout sesi sebaiknya soft delete agar riwayat token tetap ada.
- **Pola:** Kolom `deleted_at` + `@Table(..., { softDelete: true })`; revoke pakai `.softDelete()` bukan `.delete()`. Query otomatis `whereNull deleted_at` (AuthGuard, list sessions).
- **File:** `db/migrations/20260810170000_alter-personal-access-token-soft-delete.ts`, `models/personal-access-token.model.ts`, `apps/backend/src/api/user/user.service.ts`

## Logs super-admin — 2026-08-10

- **Menu:** `/logs/login`, `/logs/activity` — hanya role `super-admin` (sidebar filter roles + `SuperAdminGuard`).
- **Login log:** `GET /logs/login-sessions` pakai `queryWithDeleted()` + join users.
- **Activity log:** `audit_logs` diisi `AuditLogInterceptor` global (mutasi POST/PUT/PATCH/DELETE); kolom `token` (join `personal_access_token.token`), `status` (`success`|`error`), `response_message` (jsonb). Error validasi/exception ikut direkam via `catchError` + fallback `HandleExceptionFilter`; helper `utils/helpers/audit-log.helper.ts`.
- **File:** `apps/backend/src/api/logs/`, `utils/interceptors/audit-log.interceptor.ts`, `bengkel-admin/src/pages/logs/`

## Monorepo

| Repo | Stack |
|------|-------|
| backend | NestJS, PostgreSQL, Redis, Bull |
| bengkel-admin | React, HeroUI, Redux, i18n |
| bengkel-customer | React (member app) |
