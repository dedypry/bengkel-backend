import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto, ProductQueryDto } from './dto/products.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelJsService } from 'utils/services/exceljs.service';

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
}
