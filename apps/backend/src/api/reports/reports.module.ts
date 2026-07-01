import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ExcelJsService],
})
export class ReportsModule {}
