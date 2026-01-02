import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { google } from 'googleapis';
import 'dotenv/config';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private readonly pgDumpPath = '/opt/homebrew/opt/postgresql@17/bin/pg_dump';
  private readonly DRIVE_FOLDER_ID = '1usS8v8oIhMMXyCXL9vsy4hNP5E399O_H';

  // @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCron() {
    const execPromise = promisify(exec);
    console.log('--- Memulai Backup Otomatis (Objection/Knex context) ---');
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USERNAME;
    const dbPass = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFolder = path.resolve(process.cwd(), 'backups');
    const fileName = `backup-${dbName}-${timestamp}.sql`;
    const filePath = path.join(backupFolder, fileName);

    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    try {
      console.log(`Exporting database: ${dbName}...`);
      const command = `PGPASSWORD='${dbPass}' ${this.pgDumpPath} -h ${dbHost} -U ${dbUser} ${dbName} > ${filePath}`;
      await execPromise(command);

      this.logger.log(`✅ Backup berhasil: ${filePath}`);

      // 4. Hapus file lama (misal simpan hanya 7 hari terakhir)
      this.pruneOldBackups(backupFolder, 1);
    } catch (error) {
      this.logger.error('❌ Gagal Backup:', error.message);
    }
  }

  private pruneOldBackups(folder: string, daysToKeep: number) {
    const files = fs.readdirSync(folder);
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);
      const ageInDays = (now - stats.mtimeMs) / msPerDay;

      if (ageInDays > daysToKeep) {
        fs.unlinkSync(filePath);
        this.logger.warn(`🗑️ File backup lama dihapus: ${file}`);
      }
    });
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async uploadToGdrive() {
    const backupFolder = path.resolve(process.cwd(), 'backups');

    // 1. Cari file terbaru di folder backup
    const files = fs.readdirSync(backupFolder);
    if (files.length === 0) {
      this.logger.warn('Tidak ada file backup yang ditemukan untuk diunggah.');
      return;
    }

    // Urutkan berdasarkan waktu modifikasi terbaru
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
        mimeType: 'application/x-sql', // MIME type untuk file .sql
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

      // OPSIONAL: Hapus file lokal setelah berhasil upload agar disk tidak penuh
      // fs.unlinkSync(filePath);
      // this.logger.log(`🗑️ File lokal ${latestFile} telah dihapus.`);
    } catch (error) {
      this.logger.error(`❌ Gagal mengunggah ke GDrive: ${error.message}`);
    }
  }
}
