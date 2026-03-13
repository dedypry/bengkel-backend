import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { VendorTransactionService } from './vendor-transaction.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';

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

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.vendorTransactionService.detail(id);
  }
}
