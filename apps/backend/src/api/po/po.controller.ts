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
import { BulkDownloadPoInvoiceDto, CreatePoDto, PoQuery } from './dto/po.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import type { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: PoQuery, @Auth() auth: IAuth) {
    return this.poService.list(query, auth);
  }

  @Post('invoice/download/bulk')
  async downloadBulkInvoice(
    @Body() body: BulkDownloadPoInvoiceDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const zipBuffer = await this.poService.buildInvoicesZip(body.ids, auth);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=po-invoices.zip',
    );
    res.send(zipBuffer);
  }

  @Get('invoice/download/:id')
  async downloadInvoice(
    @Param('id') id: number,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const { buffer, fileName } = await this.poService.buildInvoicePdf(id, auth);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}.pdf`,
    );
    res.send(buffer);
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.poService.detail(id, auth);
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
