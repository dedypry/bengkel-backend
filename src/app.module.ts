import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { JoiPipeModule } from 'nestjs-joi';
import { JwtModule } from '@nestjs/jwt';
import { RegionModule } from './api/region/region.module';
import { RolesModule } from './api/roles/roles.module';
import { EmployeesModule } from './api/employees/employees.module';
import { UserModule } from './api/user/user.module';
import { ServicesModule } from './api/services/services.module';
import { ProductsModule } from './api/products/products.module';
import { SuppliersModule } from './api/suppliers/suppliers.module';
import { UploadModule } from './api/upload/upload.module';
import { CustomersModule } from './api/customers/customers.module';
import { WebsocketModule } from './api/websocket/websocket.module';
import { VehiclesModule } from './api/vehicles/vehicles.module';
import { CompaniesModule } from './api/companies/companies.module';
import { MechanicsModule } from './api/mechanics/mechanics.module';
import 'dotenv/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    JoiPipeModule.forRoot({
      pipeOpts: {
        usePipeValidationException: true,
      },
    }),
    AuthModule,
    RegionModule,
    RolesModule,
    EmployeesModule,
    UserModule,
    ServicesModule,
    ProductsModule,
    SuppliersModule,
    UploadModule,
    CustomersModule,
    WebsocketModule,
    VehiclesModule,
    CompaniesModule,
    MechanicsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
