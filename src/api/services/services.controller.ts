import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import { IQuery } from 'utils/interfaces/query';
import { CreateCategoryDto } from './dto/category.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateServiceDto } from './dto/service.dto';

@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  list(@Query(new PaginationPipe()) query: IQuery, @Auth() auth: IAuth) {
    return this.servicesService.list(query, auth);
  }

  @Get('categories')
  listCategories() {
    return this.servicesService.listCategory();
  }
  @Post('categories')
  createCategories(@Body() body: CreateCategoryDto, @Auth() auth: IAuth) {
    return this.servicesService.createCategory(body, auth);
  }

  @Post()
  async createService(@Body() body: CreateServiceDto, @Auth() auth: IAuth) {
    console.log('MASUK', body, auth);
    await this.servicesService.createService(body, auth);

    return 'Service berhasil di buat';
  }
}
