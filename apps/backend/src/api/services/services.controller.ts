import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreateServiceDto } from './dto/service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelJsService } from 'utils/services/exceljs.service';
import type { Response } from 'express';
import dayjs from 'dayjs';

@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.servicesService.list(query, auth);
  }

  @Get('export/excel')
  async exportExcel(
    @Query(new PaginationPipe()) query: IQuery,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const rows = await this.servicesService.exportList(query, auth);

    const durationTypeLabel: Record<string, string> = {
      minutes: 'menit',
      hours: 'jam',
      days: 'hari',
    };

    return this.excelJs.download({
      name: 'master-jasa-servis',
      headers: [
        { header: 'Kode', key: 'code', width: 16 },
        { header: 'Nama Jasa', key: 'name', width: 32 },
        { header: 'Kategori', key: 'category', width: 22 },
        { header: 'Durasi', key: 'duration', width: 16 },
        { header: 'Kesulitan', key: 'difficulty', width: 14 },
        { header: 'Harga', key: 'price', width: 18 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Dibuat', key: 'created_at', width: 18 },
      ],
      body: rows.map((row) => ({
        code: row.code || '-',
        name: row.name,
        category: row.category?.name || '-',
        duration: `${row.estimated_duration || 0} ${durationTypeLabel[row.estimated_type || ''] || row.estimated_type || ''}`.trim(),
        difficulty: row.difficulty || '-',
        price: Number(row.price || 0),
        status: row.is_active ? 'Aktif' : 'Nonaktif',
        created_at: row.created_at
          ? dayjs(row.created_at).format('DD MMM YYYY')
          : '-',
      })),
      worksheetFn: (ws) => {
        const priceColumn = ws.getColumn(6);
        priceColumn.numFmt = '_-"Rp"* #,##0_-';
        priceColumn.alignment = { horizontal: 'right' };
      },
      res,
    });
  }

  @Get('categories')
  listCategories() {
    return this.servicesService.listCategory();
  }

  @Post('categories')
  createCategories(@Body() body: CreateCategoryDto, @Auth() auth: IAuth) {
    return this.servicesService.createCategory(body, auth);
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
      parseRow: (row) => this.servicesService.createFromImport(row, auth),
    });
    return 'Jasa Berhasil di proses, mohon tunggu beberapa saat';
  }

  @Post()
  async createService(@Body() body: CreateServiceDto, @Auth() auth: IAuth) {
    await this.servicesService.createService(body, auth);

    return 'Service berhasil di buat';
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.servicesService.destroy(id, auth);
  }
}
