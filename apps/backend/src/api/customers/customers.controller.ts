import {
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
import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  CustomerQueryDto,
  CustomerServiceHistoryQueryDto,
} from './dto/customer.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { ExcelJsService } from 'utils/services/exceljs.service';
import type { Response } from 'express';
import { VehiclesModel } from 'models/vehicles.model';
import dayjs from 'dayjs';
import { CustomersModel } from 'models/customers.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Xlsx } from 'utils/services/xlsx';

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
        id: customer.id,
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
        { header: 'ID', key: 'id', width: 22 },
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

  @Get('import/template')
  importTemplate(@Res() res: Response) {
    return this.excelJs.download({
      name: 'Laporan',
      headers: [
        { header: 'NO. POLISI', key: 'plate_number', width: 18 },
        { header: 'NAMA', key: 'name', width: 24 },
        { header: 'ALAMAT', key: 'address', width: 30 },
        { header: 'KELURAHAN/DESA', key: 'subdistrict', width: 20 },
        { header: 'KECAMATAN', key: 'district', width: 20 },
        { header: 'KOTA', key: 'city', width: 20 },
        { header: 'PROVINSI', key: 'province', width: 20 },
        { header: 'NO. TELEPON', key: 'phone', width: 18 },
        { header: 'NO. HP', key: 'mobile_phone', width: 18 },
        { header: 'TIPE', key: 'type', width: 16 },
        { header: 'WARNA', key: 'color', width: 16 },
        { header: 'THN. RAKIT', key: 'manufacture_year', width: 14 },
        { header: 'NO. RANGKA', key: 'vin_number', width: 22 },
        { header: 'NO. MESIN', key: 'engine_number', width: 22 },
        { header: 'GRUP CUSTOMER', key: 'customer_group', width: 20 },
      ],
      body: [],
      res,
    });
  }

  @Get(':id/service-history/export/pdf')
  @UseGuards(AuthGuard)
  exportServiceHistoryPdf(
    @Param('id') id: number,
    @Query() query: CustomerServiceHistoryQueryDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    return this.customersService.exportServiceHistoryPdf(id, query, auth, res);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  detail(@Param('id') id: number) {
    return this.customersService.detail(id);
  }

  @Post('import-excel')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File, @Auth() auth: IAuth) {
    Xlsx.uploadExcel({
      fileBuffer: file.buffer,
      worksheetName: 'Laporan',
      parseRow: (row) => this.customersService.createFromImport(row, auth),
    });

    return 'Data sedang di proses, mohon tunggu beberapa saat';
  }

  @Post()
  @UseGuards(AuthGuard)
  async createCustomer(@Body() body: CreateCustomerDto, @Auth() auth: IAuth) {
    const customer = await this.customersService.createCustomer(body, auth);

    return {
      message: 'Customer berhasil di simpan',
      data: customer,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.customersService.destroy(id, auth);
    return 'Customer berhasil di hapus';
  }
}
