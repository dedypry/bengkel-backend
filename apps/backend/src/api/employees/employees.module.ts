import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, ExcelJsService],
})
export class EmployeesModule {}
