import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories/categories.module';
import { UomsModule } from './uoms/uoms.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [CategoriesModule, UomsModule],
})
export class ProductsModule {}
