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
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CustomerQueryDto } from './dto/customer.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { ExcelJsService } from 'utils/services/exceljs.service';
import type { Response } from 'express';
import { VehiclesModel } from 'models/vehicles.model';
import dayjs from 'dayjs';
import { CustomersModel } from 'models/customers.model';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly excelJs: ExcelJsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  list(@Query(new PaginationPipe()) query: CustomerQueryDto) {
    return this.customersService.listCustomer(query);
  }

  @Get('export-excel')
  @UseGuards(AuthGuard)
  async exportExcel(
    @Query(new PaginationPipe()) query: CustomerQueryDto,
    @Res() res: Response,
  ) {
    query.noPagination = 1;
    query.isVehicle = 1;
    const result: any = await this.customersService.listCustomer(query);

    const formattedData = (result || []).flatMap((customer: CustomersModel) => {
      if (!customer.vehicles || customer.vehicles.length === 0) {
        return [
          {
            created_at: dayjs(customer.created_at).format('DD MMM YYYY'),
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            customer_type: customer.customer_type,
            vehilce_type: '-',
            plate_number: '-',
            vin_number: '-',
            engine_number: '-',
          },
        ];
      }
      return customer.vehicles.map((vehicle: VehiclesModel) => ({
        created_at: dayjs(vehicle.created_at).format('DD MMM YYYY'),
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        customer_type: customer.customer_type,
        brand: vehicle.brand,
        model: vehicle.model,
        plate_number: vehicle.plate_number,
        vin_number: vehicle.vin_number, // Nomor Rangka
        engine_number: vehicle.engine_number, // Nomor Mesin
      }));
    });

    this.excelJs.download({
      name: 'List Customer',
      headers: [
        { header: 'Waktu Input', key: 'created_at', width: 22 },
        { header: 'Nama Customer', key: 'name', width: 22 },
        { header: 'Telp', key: 'phone', width: 15 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Type Pelanggan', key: 'customer_type', width: 15 },
        { header: 'Brand', key: 'brand', width: 21 },
        { header: 'Model', key: 'model', width: 21 },
        { header: 'No. Polisi', key: 'plate_number', width: 15 },
        { header: 'No. Rangka', key: 'vin_number', width: 20 },
        { header: 'No. Mesin', key: 'engine_number', width: 20 },
      ],
      body: formattedData,
      res,
      worksheetFn: (worksheet) => {
        const headerRow = worksheet.getRow(1);

        headerRow.font = {
          bold: true,
          size: 12,
        };

        headerRow.height = 25;
        headerRow.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        headerRow.commit();
      },
    });
  }

  @Get('brands')
  brands() {
    return this.customersService.listBrand();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  detail(@Param('id') id: number) {
    return this.customersService.detail(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createCustomer(@Body() body: CreateCustomerDto, @Auth() auth: IAuth) {
    await this.customersService.createCustomer(body, auth);

    return 'Customer berhasil di simpan';
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.customersService.destroy(id, auth);
    return 'Customer berhasil di hapus';
  }
}
