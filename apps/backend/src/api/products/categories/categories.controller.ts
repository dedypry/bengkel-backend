import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { CategoryQueryDto, CreateCategoryDto } from './dto/categories.dto';

@UseGuards(AuthGuard)
@Controller('products/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('list')
  list(@Query() query: CategoryQueryDto, @Auth() auth: IAuth) {
    return this.categoriesService.list(query, auth);
  }

  @Get('id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.categoriesService.detail(id, auth);
  }

  @Post()
  async create(@Body() body: CreateCategoryDto, @Auth() auth: IAuth) {
    const category = await this.categoriesService.create(body, auth);
    return {
      message: 'Kategory berhasil disimpan',
      data: category,
    };
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.categoriesService.destroy(id, auth);
    return 'Kategori berhasil dihapus';
  }
}
