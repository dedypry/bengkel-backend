import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { DatabaseBackupsModel } from 'models/database-backups.model';
import 'dotenv/config';

@Injectable()
export class PgDumpService {
  private readonly logger = new Logger(PgDumpService.name);
  private readonly pgDumpPath = process.env.PG_DUMP_PATH || 'pg_dump';

  getBackupFileName(): string {
    const dbName = process.env.DB_NAME || 'bengkel';

    return `backup-${dbName}.sql`;
  }

  getBackupStorageDir(): string {
    if (process.env.BACKUP_STORAGE_PATH) {
      return path.resolve(process.env.BACKUP_STORAGE_PATH);
    }

    return path.resolve(process.cwd(), 'backups');
  }

  ensureBackupDir(dir?: string): string {
    const backupFolder = dir ?? this.getBackupStorageDir();

    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    return backupFolder;
  }

  buildBackupPath(fileName?: string): string {
    return path.join(
      this.ensureBackupDir(),
      fileName ?? this.getBackupFileName(),
    );
  }

  getBackupFilePath(): string {
    return this.buildBackupPath();
  }

  async upsertBackupRecord(
    userId: number,
  ): Promise<{ backup: DatabaseBackupsModel; shouldEnqueue: boolean }> {
    const fileName = this.getBackupFileName();
    const filePath = this.getBackupFilePath();

    const existing = await DatabaseBackupsModel.query()
      .where('user_id', userId)
      .orderBy('id', 'desc')
      .first();

    if (existing?.status === 'processing') {
      return { backup: existing, shouldEnqueue: false };
    }

    if (existing) {
      const backup = await DatabaseBackupsModel.query().patchAndFetchById(
        existing.id,
        {
          file_name: fileName,
          file_path: filePath,
          status: 'processing',
          error_message: null,
          completed_at: null,
          file_size: null,
        },
      );

      return { backup, shouldEnqueue: true };
    }

    const backup = await DatabaseBackupsModel.query().insert({
      user_id: userId,
      file_name: fileName,
      file_path: filePath,
      status: 'processing',
    });

    return { backup, shouldEnqueue: true };
  }

  async createDump(outputPath: string): Promise<{ fileSize: number }> {
    const execPromise = promisify(exec);
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USERNAME;
    const dbPass = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;

    const backupFolder = path.dirname(outputPath);

    this.ensureBackupDir(backupFolder);

    const command = `PGPASSWORD='${dbPass}' ${this.pgDumpPath} -h ${dbHost} -U ${dbUser} ${dbName} > ${outputPath}`;

    this.logger.log(`Exporting database: ${dbName}...`);
    await execPromise(command);

    const stats = fs.statSync(outputPath);

    this.logger.log(`Backup berhasil: ${outputPath} (${stats.size} bytes)`);

    return { fileSize: stats.size };
  }
}
