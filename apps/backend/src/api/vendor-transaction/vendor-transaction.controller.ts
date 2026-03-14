import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VendorTransactionService } from './vendor-transaction.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreateVendorTrxDto } from './dto/vendor-transaction.dto';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import GeneratePDF from 'utils/services/pdf-make.service';
import type { Response } from 'express';
import terbilang from '@gratcy/angka-terbilang-indonesia';

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
  @Get('payment/:id')
  detailPayment(@Param('id') id: number) {
    return this.vendorTransactionService.detailPayment(id);
  }

  @Get('payment/download/:id')
  async downloadPayment(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const detail = await this.vendorTransactionService.detailPayment(id);
    const totalQty = (detail?.items || []).reduce((sum, item) => {
      const qty = Number(item.qty) || 0;
      return sum + qty;
    }, 0);

    const html = await renderHtml({
      location: 'vendor-transaction',
      data: {
        ...detail,
        totalQty,
        terbilang: terbilang(Number(detail.total), { dec: '', lang: 'id' }),
      },
    });

    const content = await layoutPDF({
      header: 'FAKTUR PEMBELIAN',
      content: [html],
      companyId: auth.company_id,
      invNo: detail.purchase_no,
      date: detail.date,
    });

    return GeneratePDF.make(res).download(content);
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.vendorTransactionService.detail(id);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.vendorTransactionService.destroy(id);
  }

  @Post()
  createTrx(@Body() body: CreateVendorTrxDto, @Auth() auth: IAuth) {
    return this.vendorTransactionService.createTrx(body, auth);
  }
}
