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
import { IQuery } from 'utils/interfaces/query';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateCategoryDto } from './dto/categories.dto';

@UseGuards(AuthGuard)
@Controller('products/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list(@Query() query: IQuery, @Auth() auth: IAuth) {
    return this.categoriesService.list(query, auth);
  }

  @Post()
  async create(@Body() body: CreateCategoryDto, @Auth() auth: IAuth) {
    await this.categoriesService.create(body, auth);
    return 'Kategory berhasil disimpan';
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.categoriesService.destroy(id, auth);
    return 'Kategori berhasil dihapus';
  }
}
