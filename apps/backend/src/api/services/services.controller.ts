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
import { ServicesService } from './services.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CreateServiceDto, UpdateServiceSettingsDTO } from './dto/service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelJsService } from 'utils/services/exceljs.service';

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

  @Get('categories')
  listCategories() {
    return this.servicesService.listCategory();
  }

  @Get('settings')
  getSetting(@Auth() auth: IAuth) {
    return this.servicesService.setting(auth);
  }

  @Post('settings')
  updateSetting(@Body() body: UpdateServiceSettingsDTO) {
    return this.servicesService.updateSetting(body);
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
