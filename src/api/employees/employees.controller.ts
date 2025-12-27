import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employees.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import type { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  list(@Auth() auth: IAuth, @Query(new PaginationPipe()) query: IQuery) {
    return this.employeesService.list(auth, query);
  }

  @Get('summary')
  summary(@Auth() auth: IAuth) {
    return this.employeesService.summary(auth);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.employeesService.detail(id, auth);
  }

  @Post()
  async create(@Body() body: EmployeeDto, @Auth() auth: IAuth) {
    await this.employeesService.create(body, auth);
    return 'User berhasil didaftarkan';
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.employeesService.destroy(id, auth);
    return 'User berhasil dihapus';
  }
}
