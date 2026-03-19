import { Controller, Get, Query } from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';
import { IQuery } from 'utils/interfaces/query';

@Controller('vehicle-master')
export class VehicleMasterController {
  constructor(private readonly vehicleMasterService: VehicleMasterService) {}

  @Get()
  list(@Query() query: IQuery) {
    return this.vehicleMasterService.list(query);
  }
}
