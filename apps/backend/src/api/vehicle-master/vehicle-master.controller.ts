import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';
import { IQueryVehicles, VehicleCreateDto } from './dto/vehicle-master.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';

@Controller('vehicle-master')
export class VehicleMasterController {
  constructor(private readonly vehicleMasterService: VehicleMasterService) {}

  @Get()
  list(@Query() query: IQueryVehicles) {
    return this.vehicleMasterService.list(query);
  }

  @UseGuards(AuthGuard)
  @Post()
  updateOrCreate(@Body() body: VehicleCreateDto, @Auth() auth: IAuth) {
    return this.vehicleMasterService.create(body, auth);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.vehicleMasterService.destroy(id);
  }
}
