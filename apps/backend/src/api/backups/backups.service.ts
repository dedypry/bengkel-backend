import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { StreamableFile } from '@nestjs/common';
import { DatabaseBackupsModel } from 'models/database-backups.model';
import { UsersModel } from 'models/users.model';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PgDumpService } from 'utils/services/pg-dump.service';
import 'dotenv/config';

@Injectable()
export class BackupsService {
  constructor(
    @InjectQueue('BACKUP-QUEUE') private readonly backupQueue: Queue,
    private readonly pgDumpService: PgDumpService,
  ) {}

  private async assertBackupAccess(auth: IAuth) {
    const user = await UsersModel.query()
      .withGraphFetched('roles')
      .findById(auth.id);

    if (!user) {
      throw new ForbiddenException('Akses ditolak');
    }

    const roleSlugs = user.roles?.map((role) => role.slug) ?? [];
    const isOwner = user.type === 'owner';
    const isSuperAdmin = roleSlugs.includes('super-admin');

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException(
        'Hanya owner atau super-admin yang dapat melakukan backup database',
      );
    }
  }

  async createBackup(auth: IAuth) {
    await this.assertBackupAccess(auth);

    const { backup, shouldEnqueue } =
      await this.pgDumpService.upsertBackupRecord(auth.id);

    if (shouldEnqueue) {
      await this.backupQueue.add('run-backup', { backupId: backup.id });
    }

    return backup;
  }

  async getLatest(auth: IAuth) {
    await this.assertBackupAccess(auth);

    return DatabaseBackupsModel.query()
      .where('user_id', auth.id)
      .orderBy('id', 'desc')
      .first();
  }

  async download(auth: IAuth, id: number) {
    await this.assertBackupAccess(auth);

    const backup = await DatabaseBackupsModel.query()
      .where('id', id)
      .where('user_id', auth.id)
      .first();

    if (!backup) {
      throw new NotFoundException('Backup tidak ditemukan');
    }

    if (backup.status !== 'ready') {
      throw new ForbiddenException('Backup belum siap untuk diunduh');
    }

    if (!backup.file_path || !fs.existsSync(backup.file_path)) {
      throw new NotFoundException('File backup tidak ditemukan');
    }

    const stream = createReadStream(backup.file_path);

    return new StreamableFile(stream, {
      type: 'application/sql',
      disposition: `attachment; filename="${backup.file_name}"`,
    });
  }
}
