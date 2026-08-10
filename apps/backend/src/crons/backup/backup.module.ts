import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PgDumpModule } from 'utils/modules/pg-dump.module';

@Module({
  imports: [ScheduleModule.forRoot(), PgDumpModule],
  providers: [BackupService],
})
export class BackupModule {}
