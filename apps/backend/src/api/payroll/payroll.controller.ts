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
import { PayrollService } from './payroll.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import type { IQuery } from 'utils/interfaces/query';
import {
  GeneratePayrollDto,
  PayrollQueryDto,
  SalaryDto,
  UpdatePayrollItemDto,
} from './dto/payroll.dto';

@UseGuards(AuthGuard)
@Controller('payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  // ---------- Master gaji ----------

  @Get('salaries')
  listSalaries(
    @Auth() auth: IAuth,
    @Query(new PaginationPipe()) query: IQuery,
  ) {
    return this.payrollService.listSalaries(auth, query);
  }

  @Post('salaries')
  async upsertSalary(@Body() body: SalaryDto, @Auth() auth: IAuth) {
    const data = await this.payrollService.upsertSalary(body, auth);

    return { message: 'Konfigurasi gaji berhasil disimpan', data };
  }

  @Delete('salaries/:id')
  async destroySalary(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.payrollService.destroySalary(id, auth);

    return 'Konfigurasi gaji berhasil dihapus';
  }

  // ---------- Periode penggajian ----------

  @Get('summary')
  summary(@Auth() auth: IAuth) {
    return this.payrollService.summary(auth);
  }

  @Get()
  list(
    @Auth() auth: IAuth,
    @Query(new PaginationPipe()) query: PayrollQueryDto,
  ) {
    return this.payrollService.list(auth, query);
  }

  @Post('generate')
  async generate(@Body() body: GeneratePayrollDto, @Auth() auth: IAuth) {
    const data = await this.payrollService.generate(body, auth);

    return { message: 'Penggajian berhasil dibuat', data };
  }

  @Patch('items/:id')
  async updateItem(
    @Param('id') id: number,
    @Body() body: UpdatePayrollItemDto,
    @Auth() auth: IAuth,
  ) {
    const data = await this.payrollService.updateItem(id, body, auth);

    return { message: 'Item penggajian berhasil diperbarui', data };
  }

  @Post(':id/pay')
  async pay(@Param('id') id: number, @Auth() auth: IAuth) {
    const data = await this.payrollService.pay(id, auth);

    return { message: 'Penggajian berhasil ditandai sudah dibayar', data };
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.payrollService.detail(id, auth);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.payrollService.destroy(id, auth);

    return 'Penggajian berhasil dihapus';
  }
}
