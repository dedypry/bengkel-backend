import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { QueryRevenueDto } from './dto/reports.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('revenue')
  revenue(@Query() query: QueryRevenueDto, @Auth() auth: IAuth) {
    return this.reportsService.revenue(query, auth);
  }
}
