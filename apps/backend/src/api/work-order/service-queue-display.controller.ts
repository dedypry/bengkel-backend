import { Controller, Get, Query } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';

@Controller('service-queue')
export class ServiceQueueDisplayController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get('display')
  display(@Query('company_id') companyId: number) {
    return this.workOrderService.displayForTv(Number(companyId));
  }
}
