import { Global, Module } from '@nestjs/common';
import { PgDumpService } from 'utils/services/pg-dump.service';

@Global()
@Module({
  providers: [PgDumpService],
  exports: [PgDumpService],
})
export class PgDumpModule {}
