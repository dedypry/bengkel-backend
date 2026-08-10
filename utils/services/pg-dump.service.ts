import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import 'dotenv/config';

@Injectable()
export class PgDumpService {
  private readonly logger = new Logger(PgDumpService.name);
  private readonly pgDumpPath = process.env.PG_DUMP_PATH || 'pg_dump';

  async createDump(outputPath: string): Promise<{ fileSize: number }> {
    const execPromise = promisify(exec);
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USERNAME;
    const dbPass = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;

    const backupFolder = path.dirname(outputPath);

    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder, { recursive: true });
    }

    const command = `PGPASSWORD='${dbPass}' ${this.pgDumpPath} -h ${dbHost} -U ${dbUser} ${dbName} > ${outputPath}`;

    this.logger.log(`Exporting database: ${dbName}...`);
    await execPromise(command);

    const stats = fs.statSync(outputPath);

    this.logger.log(`Backup berhasil: ${outputPath} (${stats.size} bytes)`);

    return { fileSize: stats.size };
  }

  pruneOldBackups(folder: string, daysToKeep: number) {
    if (!fs.existsSync(folder)) {
      return;
    }

    const files = fs.readdirSync(folder);
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);
      const ageInDays = (now - stats.mtimeMs) / msPerDay;

      if (ageInDays > daysToKeep) {
        fs.unlinkSync(filePath);
        this.logger.warn(`File backup lama dihapus: ${file}`);
      }
    });
  }
}
