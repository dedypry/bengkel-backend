import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { Response } from 'express';
import {
  QueryFrequentCustomersDto,
  QueryRevenueDto,
  UpdateRevenueTargetDto,
} from './dto/reports.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('revenue')
  revenue(@Query() query: QueryRevenueDto, @Auth() auth: IAuth) {
    return this.reportsService.revenue(query, auth);
  }

  @Post('revenue-target')
  updateRevenueTarget(
    @Body() body: UpdateRevenueTargetDto,
    @Auth() auth: IAuth,
  ) {
    return this.reportsService.updateMonthlyTarget(body, auth);
  }

  @Get('frequent-customers')
  frequentCustomers(
    @Query() query: QueryFrequentCustomersDto,
    @Auth() auth: IAuth,
  ) {
    return this.reportsService.frequentCustomers(query, auth);
  }

  @Get('frequent-customers/export/excel')
  exportFrequentCustomersExcel(
    @Query() query: QueryFrequentCustomersDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    return this.reportsService.exportFrequentCustomersExcel(query, auth, res);
  }

  @Get('frequent-customers/export/pdf')
  exportFrequentCustomersPdf(
    @Query() query: QueryFrequentCustomersDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    return this.reportsService.exportFrequentCustomersPdf(query, auth, res);
  }
}
