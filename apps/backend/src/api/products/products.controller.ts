import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateStockDto,
} from './dto/products.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelJsService } from 'utils/services/exceljs.service';
import { ProductsModel } from 'models/products.model';
import type { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  list(
    @Query(new PaginationPipe()) query: ProductQueryDto,
    @Auth() auth: IAuth,
  ) {
    return this.productsService.list(query, auth);
  }

  @Get('top-part')
  topPart(@Auth() auth: IAuth) {
    return this.productsService.topParts(auth);
  }

  @Get('export/excel')
  async exportExcel(
    @Query(new PaginationPipe()) query: ProductQueryDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const products = await this.productsService.list(query, auth, true);

    this.excelJs.download({
      name: 'product master',
      headers: [
        { header: 'KODE', key: 'code', width: 20 },
        { header: 'NAMA', key: 'name', width: 90 },
        { header: 'GROUP', key: 'group', width: 12 },
        { header: 'SUB GROUP', key: 'sub_group', width: 12 },
        { header: 'SATUAN', key: 'uom' },
        { header: 'HARGA JUAL', key: 'sell_price', width: 20 },
        { header: 'PAJAK %', key: 'ppn' },
        { header: 'RAK', key: 'location' },
      ],
      body: products.map((item: ProductsModel) => ({
        ...item,
        group: item.category?.parent?.name,
        sub_group: item.category?.name,
        uom: item.unit?.toUpperCase(),
        sell_price: Number(item.sell_price),
      })),
      worksheetFn: (ws) => {
        // Ambil kolom ke-6 (F)
        const priceColumn = ws.getColumn(6);

        // Terapkan format mata uang Indonesia
        // Format: "Rp" #,##0
        priceColumn.numFmt = '_-"Rp"* #,##0_-';

        // Opsional: Bikin teks jadi rata kanan (align right) agar rapi
        priceColumn.alignment = { horizontal: 'right' };
      },
      res,
    });
  }

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.productsService.detail(id, auth);
  }

  @Patch('update-stock/:id')
  updateStock(
    @Param('id') id: number,
    @Body() body: UpdateStockDto,
    @Auth() auth: IAuth,
  ) {
    return this.productsService.updateStock(id, body, auth);
  }

  @Post('/import')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(xlsx)$/)) {
          return callback(
            new BadRequestException('Hanya file .xlsx yang diperbolehkan!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  import(@UploadedFile() file: Express.Multer.File, @Auth() auth: IAuth) {
    this.excelJs.uploadStreamFile({
      lineStart: 2,
      fileBuffer: file.buffer,
      worksheetName: 'Laporan',
      parseRow: (row) => this.productsService.createFromImport(row, auth),
    });
    return 'Product Berhasil di proses, mohon tunggu beberapa saat';
  }

  @Post()
  async create(@Body() body: CreateProductDto, @Auth() auth: IAuth) {
    await this.productsService.create(body, auth);
    return 'Produk Berhasil di tambahkan';
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.productsService.destroy(id, auth);
  }
}
