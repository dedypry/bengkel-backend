import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { CustomerEmailModule } from 'utils/modules/customer-email.module';

@Module({
  imports: [CustomerEmailModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
