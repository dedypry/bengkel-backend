import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { ExpenseCreateDto } from './dto/expense.dto';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';

@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.expenseService.list(query, auth);
  }
  @Get('categories')
  categories(@Auth() auth: IAuth) {
    return this.expenseService.listCategories(auth);
  }

  @Post()
  createExpense(@Body() body: ExpenseCreateDto, @Auth() auth: IAuth) {
    return this.expenseService.createExpense(body, auth);
  }
}
