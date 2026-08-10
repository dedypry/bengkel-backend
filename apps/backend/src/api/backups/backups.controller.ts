import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { BackupsService } from './backups.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('backups')
export class BackupsController {
  constructor(private readonly backupsService: BackupsService) {}

  @Post()
  create(@Auth() auth: IAuth) {
    return this.backupsService.createBackup(auth);
  }

  @Get('latest')
  getLatest(@Auth() auth: IAuth) {
    return this.backupsService.getLatest(auth);
  }

  @Get(':id/download')
  async download(
    @Auth() auth: IAuth,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StreamableFile> {
    return this.backupsService.download(auth, id);
  }
}
