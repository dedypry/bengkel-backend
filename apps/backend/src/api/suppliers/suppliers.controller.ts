import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { ExcelJsService } from 'utils/services/exceljs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IAuth } from 'utils/interfaces/IAuth';
import { Auth } from 'utils/decorators/auth.decorator';
import { AuthGuard } from 'utils/guards/auth.guard';
import { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { CreateSupplierDto } from './dto/suppliers.dto';

@UseGuards(AuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.suppliersService.list(query, auth);
  }

  @Post()
  create(@Body() body: CreateSupplierDto, @Auth() auth: IAuth) {
    return this.suppliersService.create(body, auth);
  }

  @Post('/create/auto')
  async createAuto(@Auth() auth: IAuth) {
    await this.suppliersService.createAuto(auth);
    return 'Product Berhasil di proses, mohon tunggu beberapa saat';
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
      parseRow: (row) => this.suppliersService.createFromImport(row, auth),
    });
    return 'Product Berhasil di proses, mohon tunggu beberapa saat';
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.suppliersService.destroy(id, auth);
  }
}
