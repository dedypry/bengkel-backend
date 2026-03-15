import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { UpdateServiceSettingsDTO } from './dto/settings.dto';

@UseGuards(AuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('brand')
  list(@Auth() auth: IAuth) {
    return this.settingsService.detail(auth);
  }

  @Get()
  getSetting(@Auth() auth: IAuth) {
    return this.settingsService.setting(auth);
  }

  @Post()
  updateSetting(@Body() body: UpdateServiceSettingsDTO, @Auth() auth: IAuth) {
    return this.settingsService.updateSetting(body, auth);
  }
}
