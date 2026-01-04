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
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CustomerQueryDto } from './dto/customer.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';

@UseGuards(AuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: CustomerQueryDto) {
    return this.customersService.listCustomer(query);
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.customersService.detail(id);
  }

  @Post()
  async createCustomer(@Body() body: CreateCustomerDto, @Auth() auth: IAuth) {
    await this.customersService.createCustomer(body, auth);

    return 'Customer berhasil di simpan';
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.customersService.destroy(id, auth);
    return 'Customer berhasil di hapus';
  }
}
