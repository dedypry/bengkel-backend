import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { ProfileModule } from './profile/profile.module';
import { WoModule } from './wo/wo.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [ProfileModule, WoModule, VehicleModule, DashboardModule],
})
export class CustomersModule {}
