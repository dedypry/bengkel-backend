import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService, ExcelJsService],
})
export class SuppliersModule {}
