import { Controller, Get, UseGuards } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Get()
  list() {
    return this.mechanicsService.list();
  }
}
