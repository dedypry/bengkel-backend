# Database Backup

## Ringkasan

- Manual backup: profile page (owner/super-admin) → POST `/backups`
- Cron: daily 01:00 WIB → `apps/backend/src/crons/backup/backup.service.ts`
- Storage: `{cwd}/backups/backup-{dbName}.sql` (single file, overwrite)
- DB record: `database_backups` (upsert, bukan file baru tiap run)
- Queue: Bull `BACKUP-QUEUE` — **Redis wajib**
- Server prod: `pg_dump` harus ada (`PG_DUMP_PATH` di `.env`)

## Env

`REDIS_HOST`, `REDIS_PORT`, `PG_DUMP_PATH`, `BACKUP_USER_ID`, `BACKUP_STORAGE_PATH`

## File kunci

- `utils/services/pg-dump.service.ts`
- `apps/backend/src/api/backups/`
- Migration: `20260810120000_create-database-backups.ts`
