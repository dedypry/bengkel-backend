import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { JoiPipeModule } from 'nestjs-joi';
import { JwtModule } from '@nestjs/jwt';
import { RegionModule } from './api/region/region.module';
import { RolesModule } from './api/roles/roles.module';
import { EmployeesModule } from './api/employees/employees.module';
import { UserModule } from './api/user/user.module';
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
