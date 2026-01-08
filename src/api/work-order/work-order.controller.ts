import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import {
  UpdateMechanicWoDto,
  UpdateStatusWoDto,
  WoQuery,
  WorkOrderRequestDto,
} from './dto/work-order.dto';
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
  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.workOrderService.detail(id, auth);
  }

  @Post()
  create(@Body() body: WorkOrderRequestDto, @Auth() auth: IAuth) {
    return this.workOrderService.createWO(body, auth);
  }

  @Patch('mechanic/:id')
  updateMechanic(
    @Param('id') id: number,
    @Body() body: UpdateMechanicWoDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.updateMechanichs(id, body, auth);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: UpdateStatusWoDto,
    @Auth() auth: IAuth,
  ) {
    await this.workOrderService.updateProgres(id, body, auth);

    return 'Status Berhasil diubah';
  }
}
