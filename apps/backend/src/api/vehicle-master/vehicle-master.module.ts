import { Module } from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';
import { VehicleMasterController } from './vehicle-master.controller';

@Module({
  controllers: [VehicleMasterController],
  providers: [VehicleMasterService],
})
export class VehicleMasterModule {}
