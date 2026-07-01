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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/warehouse.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { IQuery } from 'utils/interfaces/query';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import type { Response } from 'express';
import { ExcelJsService } from 'utils/services/exceljs.service';
import dayjs from 'dayjs';

@UseGuards(AuthGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(
    private readonly warehouseService: WarehouseService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Post()
  async create(@Body() body: CreateWarehouseDto, @Auth() auth: IAuth) {
    return await this.warehouseService.create(body, auth);
  }

  @Get()
  async list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return await this.warehouseService.list(query, auth);
  }

  @Get('export/excel')
  async exportExcel(
    @Query(new PaginationPipe()) query: IQuery,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const rows = await this.warehouseService.exportList(query, auth);

    return this.excelJs.download({
      name: 'master-gudang',
      headers: [
        { header: 'Kode', key: 'code', width: 14 },
        { header: 'Nama Gudang', key: 'name', width: 24 },
        { header: 'Kontak', key: 'contact_name', width: 20 },
        { header: 'Telepon', key: 'phone_number', width: 16 },
        { header: 'Email', key: 'email', width: 24 },
        { header: 'Provinsi', key: 'province', width: 18 },
        { header: 'Kota', key: 'city', width: 18 },
        { header: 'Kecamatan', key: 'district', width: 18 },
        { header: 'Alamat', key: 'address', width: 32 },
        { header: 'NPWP', key: 'npwp', width: 18 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Dibuat', key: 'created_at', width: 18 },
      ],
      body: rows.map((row) => ({
        code: row.code || '-',
        name: row.name,
        contact_name: row.contact_name || '-',
        phone_number: row.phone_number || '-',
        email: row.email || '-',
        province: row.province?.name || '-',
        city: row.city?.name || '-',
        district: row.district?.name || '-',
        address: row.address || '-',
        npwp: row.npwp || '-',
        status: row.is_active ? 'Aktif' : 'Nonaktif',
        created_at: row.created_at
          ? dayjs(row.created_at).format('DD MMM YYYY')
          : '-',
      })),
      res,
    });
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return await this.warehouseService.destroy(id, auth);
  }
}
