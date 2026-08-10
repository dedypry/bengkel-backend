import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { DatabaseBackupsModel } from 'models/database-backups.model';
import { UsersModel } from 'models/users.model';
import { PgDumpService } from 'utils/services/pg-dump.service';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private readonly DRIVE_FOLDER_ID = '1usS8v8oIhMMXyCXL9vsy4hNP5E399O_H';

  constructor(private readonly pgDumpService: PgDumpService) {}

  private async resolveCronUserId(): Promise<number | null> {
    if (process.env.BACKUP_USER_ID) {
      return Number(process.env.BACKUP_USER_ID);
    }

    const owner = await UsersModel.query().where('type', 'owner').first();

    return owner?.id ?? null;
  }

  @Cron('0 1 * * *', { timeZone: 'Asia/Jakarta' })
  async handleCron() {
    this.logger.log('Memulai backup database otomatis...');

    const userId = await this.resolveCronUserId();

    if (!userId) {
      this.logger.error(
        'Backup otomatis dibatalkan: owner tidak ditemukan (set BACKUP_USER_ID di .env)',
      );
      return;
    }

    const { backup, shouldEnqueue } =
      await this.pgDumpService.upsertBackupRecord(userId);

    if (!shouldEnqueue) {
      this.logger.warn('Backup sedang berjalan, lewati cron otomatis.');
      return;
    }

    const filePath = this.pgDumpService.getBackupFilePath();

    try {
      const { fileSize } = await this.pgDumpService.createDump(filePath);

      await DatabaseBackupsModel.query().findById(backup.id).patch({
        status: 'ready',
        file_path: filePath,
        file_size: fileSize,
        completed_at: new Date().toISOString(),
      });

      this.logger.log(`Backup berhasil: ${filePath} (${fileSize} bytes)`);
    } catch (error) {
      this.logger.error('Gagal backup:', error.message);

      await DatabaseBackupsModel.query().findById(backup.id).patch({
        status: 'failed',
        error_message: error.message,
        completed_at: new Date().toISOString(),
      });
    }
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async uploadToGdrive() {
    const backupFolder = this.pgDumpService.ensureBackupDir();
    const files = fs.readdirSync(backupFolder);

    if (files.length === 0) {
      this.logger.warn('Tidak ada file backup yang ditemukan untuk diunggah.');
      return;
    }

    const latestFile = files
      .map((file) => ({
        name: file,
        time: fs.statSync(path.join(backupFolder, file)).mtimeMs,
      }))
      .sort((a, b) => b.time - a.time)[0].name;

    const filePath = path.join(backupFolder, latestFile);

    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: path.resolve(process.cwd(), 'assets/google-credentials.json'),
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });

      const drive = google.drive({ version: 'v3', auth });

      console.log('file', latestFile);
      const fileMetadata = {
        name: latestFile,
        parents: [this.DRIVE_FOLDER_ID],
      };

      const media = {
        mimeType: 'application/x-sql',
        body: fs.createReadStream(filePath),
      };

      this.logger.log(`⏳ Sedang mengunggah: ${latestFile}...`);

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
        supportsAllDrives: true,
      });

      this.logger.log(`✅ Berhasil! Google Drive File ID: ${response.data.id}`);
    } catch (error) {
      this.logger.error(`❌ Gagal mengunggah ke GDrive: ${error.message}`);
    }
  }
}
