import { Controller, Get, UseGuards } from '@nestjs/common';
import { UomsService } from './uoms.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('products/uoms')
export class UomsController {
  constructor(private readonly uomsService: UomsService) {}

  @Get()
  list(@Auth() auth: IAuth) {
    return this.uomsService.list(auth);
  }
}
