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
import { VehicleMasterService } from './vehicle-master.service';
import { IQueryVehicles, VehicleCreateDto } from './dto/vehicle-master.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { Response } from 'express';
import { ExcelJsService } from 'utils/services/exceljs.service';
import dayjs from 'dayjs';

@Controller('vehicle-master')
export class VehicleMasterController {
  constructor(
    private readonly vehicleMasterService: VehicleMasterService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  list(@Query() query: IQueryVehicles) {
    return this.vehicleMasterService.list(query);
  }

  @Get('export/excel')
  @UseGuards(AuthGuard)
  async exportExcel(
    @Query() query: IQueryVehicles,
    @Res() res: Response,
  ) {
    const rows = await this.vehicleMasterService.exportList(query);

    return this.excelJs.download({
      name: 'master-kendaraan',
      headers: [
        { header: 'No', key: 'no', width: 8 },
        { header: 'Merk', key: 'type', width: 22 },
        { header: 'Type', key: 'merk', width: 28 },
        { header: 'CC', key: 'cc', width: 12 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Dibuat', key: 'created_at', width: 18 },
      ],
      body: rows.map((row, index) => ({
        no: index + 1,
        type: row.type || '-',
        merk: row.merk || '-',
        cc: row.cc || '-',
        status: row.status || '-',
        created_at: row.created_at
          ? dayjs(row.created_at).format('DD MMM YYYY')
          : '-',
      })),
      res,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  updateOrCreate(@Body() body: VehicleCreateDto, @Auth() auth: IAuth) {
    return this.vehicleMasterService.create(body, auth);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.vehicleMasterService.destroy(id);
  }
}
