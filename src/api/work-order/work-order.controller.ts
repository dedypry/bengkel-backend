import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WoQuery, WorkOrderRequestDto } from './dto/work-order.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('work-order')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: WoQuery, @Auth() auth: IAuth) {
    return this.workOrderService.list(query, auth);
  }

  @Post()
  create(@Body() body: WorkOrderRequestDto, @Auth() auth: IAuth) {
    return this.workOrderService.createWO(body, auth);
  }
}
