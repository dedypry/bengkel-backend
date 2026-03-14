import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VendorTransactionService } from './vendor-transaction.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreateVendorTrxDto } from './dto/vendor-transaction.dto';

@UseGuards(AuthGuard)
@Controller('vendor-transaction')
export class VendorTransactionController {
  constructor(
    private readonly vendorTransactionService: VendorTransactionService,
  ) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.vendorTransactionService.list(query, auth);
  }

  @Get('payment')
  listPayment(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.vendorTransactionService.listPayment(query, auth);
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.vendorTransactionService.detail(id);
  }

  @Post()
  createTrx(@Body() body: CreateVendorTrxDto, @Auth() auth: IAuth) {
    return this.vendorTransactionService.createTrx(body, auth);
  }
}
