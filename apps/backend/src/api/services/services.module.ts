import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ExcelJsService],
})
export class ServicesModule {}
