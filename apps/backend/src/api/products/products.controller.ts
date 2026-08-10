import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { Xlsx } from 'utils/services/xlsx';

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

  @Get('get-by-ids')
  getByIds(@Query() query: { ids: string }, @Auth() auth: IAuth) {
    const ids =
      query.ids === 'all'
        ? 'all'
        : query.ids.split(',').map((id) => Number(id));

    console.log({ ids });
    return this.productsService.getByIds(ids, auth);
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
      name: 'Laporan',
      headers: [
        { header: 'KODE', key: 'code', width: 20 },
        { header: 'NAMA', key: 'name', width: 90 },
        { header: 'GROUP', key: 'group', width: 12 },
        { header: 'SUB GROUP', key: 'sub_group', width: 12 },
        { header: 'SATUAN', key: 'uom' },
        { header: 'HARGA JUAL', key: 'sell_price', width: 20 },
        { header: 'RAK', key: 'location' },
        { header: 'STOK', key: 'stock' },
        { header: 'MIN STOK', key: 'min_stock' },
      ],
      body: products.map((item: ProductsModel) => ({
        ...item,
        group: item.category?.parent?.name,
        sub_group: item.category?.name,
        uom: item.unit?.toUpperCase(),
        sell_price: Number(item.sell_price),
        stock: Number(item.stock),
        min_stock: Number(item.min_stock),
      })),
      worksheetFn: (ws) => {
        const priceColumn = ws.getColumn(6);
        priceColumn.numFmt = '_-"Rp"* #,##0_-';
        priceColumn.alignment = { horizontal: 'right' };
      },
      res,
    });
  }

  @Get('import/template')
  importTemplate(@Res() res: Response) {
    return this.excelJs.download({
      name: 'Laporan',
      headers: [
        { header: 'KODE', key: 'code', width: 20 },
        { header: 'NAMA', key: 'name', width: 40 },
        { header: 'GROUP', key: 'group', width: 16 },
        { header: 'SUB GROUP', key: 'sub_group', width: 16 },
        { header: 'SATUAN', key: 'uom', width: 12 },
        { header: 'HARGA JUAL', key: 'sell_price', width: 18 },
        { header: 'RAK', key: 'location', width: 12 },
        { header: 'STOK', key: 'stock', width: 12 },
        { header: 'MIN STOK', key: 'min_stock', width: 12 },
      ],
      body: [
        {
          code: 'BRG-001',
          name: 'Contoh Oli Mesin 1L',
          group: 'Sparepart',
          sub_group: 'Oli',
          uom: 'PCS',
          sell_price: 75000,
          location: 'A1',
          stock: 10,
          min_stock: 2,
        },
      ],
      worksheetFn: (ws) => {
        const priceColumn = ws.getColumn(6);
        priceColumn.numFmt = '_-"Rp"* #,##0_-';
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
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStockDto,
    @Auth() auth: IAuth,
  ) {
    return this.productsService.updateStock(id, body, auth);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  import(@UploadedFile() file: Express.Multer.File, @Auth() auth: IAuth) {
    Xlsx.uploadExcel({
      fileBuffer: file.buffer,
      worksheetName: 'Laporan',
      parseRow: (row) => this.productsService.createFromImport(row, auth),
    });

    return 'Product Berhasil di proses, mohon tunggu beberapa saat dan refresh halaman';
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
