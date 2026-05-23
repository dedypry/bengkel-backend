import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { layoutPDF, renderHtml } from 'utils/helpers/render-html';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import GeneratePDF from 'utils/services/pdf-make.service';
import type { Response } from 'express';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreateVehiclesDto } from './dto/vehicles.dto';

@UseGuards(AuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery) {
    return this.vehiclesService.list(query);
  }

  @Get(':plateNo')
  async getHistory(
    @Param('plateNo') plateNo: string,
    @Query() query: any,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const result = await this.vehiclesService.getHistoryByPlateNo(plateNo);
    if (query.type === 'pdf') {
      const vehicle = await this.vehiclesService.detailByPlate(plateNo);
      const html = await renderHtml({
        location: 'history-vehicle',
        data: {
          vehicle,
          histories: result,
          customer: vehicle.customers[0],
        },
      });

      const content = await layoutPDF({
        header: 'Riwayat Servis',
        content: [html],
        companyId: auth.company_id,
        date: new Date().toISOString(),
        invNo: plateNo,
      });

      return GeneratePDF.make(res).download(content);
    }

    return res.json(result);
  }

  @Post()
  async updateOrCreate(@Body() body: CreateVehiclesDto, @Auth() auth: IAuth) {
    await this.vehiclesService.updateOrCreateVehicle(body, auth);

    return 'Data kendaraan berhasil diubah';
  }
}
