import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employees.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() body: EmployeeDto, @Auth() auth: IAuth) {
    console.log('USER', auth);
    return this.employeesService.create(body, auth);
  }
}
