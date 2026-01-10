import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PromosService } from './promos.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { CreatePromoDto } from './dto/promos.dto';

@UseGuards(AuthGuard)
@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get()
  list(@Auth() auth: IAuth) {
    return this.promosService.list(auth);
  }

  @Post()
  create(@Body() body: CreatePromoDto, @Auth() auth: IAuth) {
    return this.promosService.create(body, auth);
  }
}
