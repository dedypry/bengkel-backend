import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { google } from 'googleapis';
import * as fs from 'fs';
import 'dotenv/config';
import { PgDumpService } from 'utils/services/pg-dump.service';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private readonly DRIVE_FOLDER_ID = '1usS8v8oIhMMXyCXL9vsy4hNP5E399O_H';

  constructor(private readonly pgDumpService: PgDumpService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCron() {
    console.log('--- Memulai Backup Otomatis (Objection/Knex context) ---');
    const dbName = process.env.DB_NAME;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFolder = path.resolve(process.cwd(), 'backups');
    const fileName = `backup-${dbName}-${timestamp}.sql`;
    const filePath = path.join(backupFolder, fileName);

    try {
      await this.pgDumpService.createDump(filePath);
      this.logger.log(`✅ Backup berhasil: ${filePath}`);
      this.pgDumpService.pruneOldBackups(backupFolder, 1);
    } catch (error) {
      this.logger.error('❌ Gagal Backup:', error.message);
    }
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async uploadToGdrive() {
    const backupFolder = path.resolve(process.cwd(), 'backups');

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
