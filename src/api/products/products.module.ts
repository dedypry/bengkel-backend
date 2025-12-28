import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [CategoriesModule],
})
export class ProductsModule {}
