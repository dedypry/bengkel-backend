import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories/categories.module';
import { UomsModule } from './uoms/uoms.module';
import { ExcelJsService } from 'utils/services/exceljs.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ExcelJsService],
  imports: [CategoriesModule, UomsModule],
})
export class ProductsModule {}
