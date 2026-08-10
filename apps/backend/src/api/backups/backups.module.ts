import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BackupsService } from './backups.service';
import { BackupsController } from './backups.controller';
import { BackupProcessor } from './backup.processor';
import { PgDumpModule } from 'utils/modules/pg-dump.module';

@Module({
  imports: [
    PgDumpModule,
    BullModule.registerQueue({
      name: 'BACKUP-QUEUE',
    }),
  ],
  controllers: [BackupsController],
  providers: [BackupsService, BackupProcessor],
})
export class BackupsModule {}
