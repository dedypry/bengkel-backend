import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import {
  CancelDto,
  ChangeSugestionDto,
  ComplainWorkOrderDto,
  ListPaymentQueryDto,
  MechanicRatting,
  UpdateMechanicWoDto,
  UpdateOrderDateDto,
  UpdatePicSaDto,
  UpdateStatusWoDto,
  WoQuery,
  WorkOrderRequestDto,
  WorkOrderUpdateServiceDto,
} from './dto/work-order.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('work-order')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: WoQuery, @Auth() auth: IAuth) {
    return this.workOrderService.list(query, auth);
  }

  @Get('service/payment')
  listPayment(@Query() query: ListPaymentQueryDto, @Auth() auth: IAuth) {
    return this.workOrderService.listPayment(query, auth);
  }

  @Get('mechanic-options')
  getMechanicOptions(@Auth() auth: IAuth) {
    return this.workOrderService.getMechanicFilterOptions(auth);
  }

  @Post('call-cashier/:id')
  callCashier(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.workOrderService.callCashier(id, auth);
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

  @Patch('complaint/:id')
  updateComplaint(
    @Param('id') id: number,
    @Body() body: ComplainWorkOrderDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.updateComplaint(id, body, auth);
  }

  @Patch('pic-sa/:id')
  updatePicAndSa(
    @Param('id') id: number,
    @Body() body: UpdatePicSaDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.updatePicAndSa(id, body, auth);
  }

  @Patch('order-date/:id')
  updateOrderDate(
    @Param('id') id: number,
    @Body() body: UpdateOrderDateDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.updateOrderDate(id, body, auth);
  }

  @Patch('service/:id')
  updateService(
    @Param('id') id: number,
    @Body() body: WorkOrderUpdateServiceDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.updateServiceWo(id, body, auth);
  }

  @Delete('item/:id')
  deleteService(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.workOrderService.deleteItem(id, auth);
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
  @Patch('cancel/:id')
  async cancelWo(
    @Param('id') id: number,
    @Body() body: CancelDto,
    @Auth() auth: IAuth,
  ) {
    await this.workOrderService.cancelWo(id, body, auth);

    return 'Work Order Berhasil dibatalkan';
  }

  @Post('rating')
  mechanicRatting(@Body() body: MechanicRatting, @Auth() auth: IAuth) {
    return this.workOrderService.mechanicRatting(body, auth);
  }

  @Patch(':id/sugestion')
  changeSugestion(
    @Param('id') id: number,
    @Body() body: ChangeSugestionDto,
    @Auth() auth: IAuth,
  ) {
    return this.workOrderService.sugestion(id, body, auth);
  }
}
