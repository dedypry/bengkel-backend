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
import { WebsocketModule } from './websocket/websocket.module';
import { VehiclesModule } from './api/vehicles/vehicles.module';
import { CompaniesModule } from './api/companies/companies.module';
import { MechanicsModule } from './api/mechanics/mechanics.module';
import { BackupModule } from './crons/backup/backup.module';
import { WorkOrderModule } from './api/work-order/work-order.module';
import { SettingsModule } from './api/settings/settings.module';
import { PromosModule } from './api/promos/promos.module';
import { PaymentsModule } from './api/payments/payments.module';
import { InvoicesModule } from './api/invoices/invoices.module';
import { DashboardModule } from './api/dashboard/dashboard.module';
import { ReportsModule } from './api/reports/reports.module';
import { PermissionsModule } from './api/permissions/permissions.module';
import 'dotenv/config';
import { EmailModule } from 'utils/modules/email.module';
import { BookingsModule } from './api/bookings/bookings.module';
import { AiModule } from './api/ai/ai.module';

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
    EmailModule,
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
    BackupModule,
    WorkOrderModule,
    SettingsModule,
    PromosModule,
    PaymentsModule,
    InvoicesModule,
    DashboardModule,
    ReportsModule,
    PermissionsModule,
    BookingsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
