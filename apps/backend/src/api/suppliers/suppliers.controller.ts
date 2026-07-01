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
import { SuppliersService } from './suppliers.service';
import { ExcelJsService } from 'utils/services/exceljs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IAuth } from 'utils/interfaces/IAuth';
import { Auth } from 'utils/decorators/auth.decorator';
import { AuthGuard } from 'utils/guards/auth.guard';
import { IQuery } from 'utils/interfaces/query';
import { CreateSupplierDto } from './dto/suppliers.dto';
import type { Response } from 'express';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import dayjs from 'dayjs';

@UseGuards(AuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  list(@Query() query: IQuery, @Auth() auth: IAuth) {
    return this.suppliersService.list(query, auth);
  }

  @Get('all')
  listAll(@Query() query: IQuery, @Auth() auth: IAuth) {
    return this.suppliersService.list({} as IQuery, auth);
  }

  @Get('export/excel')
  async exportExcel(
    @Query(new PaginationPipe()) query: IQuery,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const rows = await this.suppliersService.exportList(query, auth);

    return this.excelJs.download({
      name: 'master-supplier',
      headers: [
        { header: 'Kode', key: 'code', width: 14 },
        { header: 'Nama Supplier', key: 'name', width: 28 },
        { header: 'Kontak', key: 'contact_name', width: 20 },
        { header: 'Telepon', key: 'phone', width: 16 },
        { header: 'Email', key: 'email', width: 24 },
        { header: 'Alamat', key: 'address', width: 32 },
        { header: 'NPWP', key: 'npwp', width: 18 },
        { header: 'Website', key: 'website', width: 22 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Dibuat', key: 'created_at', width: 18 },
      ],
      body: rows.map((row) => ({
        code: row.code || '-',
        name: row.name,
        contact_name: row.contact_name || '-',
        phone: row.phone || '-',
        email: row.email || '-',
        address: row.address || '-',
        npwp: row.npwp || '-',
        website: row.website || '-',
        status: row.is_active ? 'Aktif' : 'Nonaktif',
        created_at: row.created_at
          ? dayjs(row.created_at).format('DD MMM YYYY')
          : '-',
      })),
      res,
    });
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
