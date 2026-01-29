import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { WoService } from './wo.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { ListWoDto } from './dto/wo.dto';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('customers/wo')
export class WoController {
  constructor(private readonly woService: WoService) {}

  @Get('list')
  listHistory(@Query(new PaginationPipe()) query: ListWoDto) {
    return this.woService.list(query);
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.woService.detail(id);
  }
}
