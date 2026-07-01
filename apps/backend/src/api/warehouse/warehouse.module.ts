import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService, ExcelJsService],
})
export class WarehouseModule {}
