import { Module } from '@nestjs/common';
import { VendorTransactionService } from './vendor-transaction.service';
import { VendorTransactionController } from './vendor-transaction.controller';

@Module({
  controllers: [VendorTransactionController],
  providers: [VendorTransactionService],
})
export class VendorTransactionModule {}
