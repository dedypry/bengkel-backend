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
import {
  BulkCategoryUpdateDto,
  CategoryQueryDto,
  CreateCategoryDto,
  MoveSubCategoryProductsDto,
} from './dto/categories.dto';

@UseGuards(AuthGuard)
@Controller('products/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('list')
  list(@Query() query: CategoryQueryDto, @Auth() auth: IAuth) {
    return this.categoriesService.list(query, auth);
  }

  @Get(':id')
  detail(@Param('id') id: string, @Auth() auth: IAuth) {
    return this.categoriesService.detail(Number(id), auth);
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

  @Post('bulk-update')
  async bulkProductCategoryUpdate(
    @Body() body: BulkCategoryUpdateDto,
    @Auth() auth: IAuth,
  ) {
    await this.categoriesService.bulkProductCategoryUpdate(body, auth);
    return 'Kategori berhasil diupdate';
  }

  @Post('move-products')
  async moveSubCategoryProducts(
    @Body() body: MoveSubCategoryProductsDto,
    @Auth() auth: IAuth,
  ) {
    const result = await this.categoriesService.moveSubCategoryProducts(
      body,
      auth,
    );

    return {
      message: `${result.movedCount} produk berhasil dipindahkan`,
      data: result,
    };
  }
}
