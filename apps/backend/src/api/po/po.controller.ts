import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PoService } from './po.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { CreatePoDto, PoQuery } from './dto/po.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import type { Response } from 'express';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import GeneratePDF from 'utils/services/pdf-make.service';
import terbilang from '@gratcy/angka-terbilang-indonesia';

@UseGuards(AuthGuard)
@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: PoQuery, @Auth() auth: IAuth) {
    return this.poService.list(query, auth);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.poService.detail(id, auth);
  }

  @Get('invoice/download/:id')
  async downloadInvoice(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const po = await this.poService.detail(id, auth);
    const totalQty = po.items.reduce((sum, item) => sum + Number(item.qty), 0);
    const html = await renderHtml({
      location: 'po-invoice',
      data: {
        ...po,
        totalQty,
        terbilang: terbilang(Number(po.total), {
          dec: '',
          lang: 'id',
        }),
      },
    });

    const content = await layoutPDF({
      header: 'FAKTUR PEMBELIAN',
      content: [html],
      companyId: auth.company_id,
      invNo: po.po_no,
      date: po.created_at,
    });

    return GeneratePDF.make(res).download(content);
  }

  @Post()
  create(@Body() body: CreatePoDto, @Auth() auth: IAuth) {
    return this.poService.create(body, auth);
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.poService.destroy(id, auth);
  }
}
