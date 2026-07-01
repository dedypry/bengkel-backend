import { Module } from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';
import { VehicleMasterController } from './vehicle-master.controller';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [VehicleMasterController],
  providers: [VehicleMasterService, ExcelJsService],
})
export class VehicleMasterModule {}
