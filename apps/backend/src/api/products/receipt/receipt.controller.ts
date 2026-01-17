import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import type { IAuth } from 'utils/interfaces/IAuth';
import { ProductReceiptDto } from '../dto/products.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { AuthGuard } from 'utils/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('products/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get('list')
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.receiptService.list(query, auth);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.receiptService.detail(id, auth);
  }

  @Post()
  receipt(@Body() body: ProductReceiptDto, @Auth() auth: IAuth) {
    return this.receiptService.receiptProduct(body, auth);
  }
}
