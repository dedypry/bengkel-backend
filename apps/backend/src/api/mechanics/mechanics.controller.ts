import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { IQuery } from 'utils/interfaces/query';

@UseGuards(AuthGuard)
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Get()
  list(@Query() query: IQuery, @Auth() auth: IAuth) {
    return this.mechanicsService.list(query, auth);
  }

  @Get('performa')
  performa(@Auth() auth: IAuth) {
    return this.mechanicsService.performa(auth);
  }
}
