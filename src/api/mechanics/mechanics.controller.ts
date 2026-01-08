import { Controller, Get, UseGuards } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Get()
  list(@Auth() auth: IAuth) {
    return this.mechanicsService.list(auth);
  }
}
