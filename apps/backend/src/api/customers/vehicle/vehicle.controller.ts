import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('customers/vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() body: CreateVehicleDto, @Auth() auth: IAuth) {
    return this.vehicleService.create(body, auth);
  }
}
