import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { DatabaseBackupsModel } from 'models/database-backups.model';
import { PgDumpService } from 'utils/services/pg-dump.service';
import 'dotenv/config';

@Processor('BACKUP-QUEUE')
export class BackupProcessor {
  private readonly logger = new Logger(BackupProcessor.name);

  constructor(private readonly pgDumpService: PgDumpService) {}

  @Process('run-backup')
  async handleRunBackup(job: Job<{ backupId: number }>) {
    const { backupId } = job.data;

    const backup = await DatabaseBackupsModel.query().findById(backupId);

    if (!backup) {
      this.logger.error(`Backup record ${backupId} tidak ditemukan`);
      return;
    }

    const filePath = this.pgDumpService.getBackupFilePath();

    try {
      const { fileSize } = await this.pgDumpService.createDump(filePath);

      await DatabaseBackupsModel.query().findById(backupId).patch({
        status: 'ready',
        file_path: filePath,
        file_name: this.pgDumpService.getBackupFileName(),
        file_size: fileSize,
        completed_at: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`Backup ${backupId} gagal:`, error.message);

      await DatabaseBackupsModel.query().findById(backupId).patch({
        status: 'failed',
        error_message: error.message,
        completed_at: new Date().toISOString(),
      });
    }
  }
}
