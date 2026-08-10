import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories/categories.module';
import { UomsModule } from './uoms/uoms.module';
import { ExcelJsService } from 'utils/services/exceljs.service';
import { ReceiptModule } from './receipt/receipt.module';
import { UploadService } from '../upload/upload.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ExcelJsService, UploadService],
  imports: [CategoriesModule, UomsModule, ReceiptModule, NotificationsModule],
})
export class ProductsModule {}
