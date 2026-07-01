import { Module } from '@nestjs/common';
import { CustomerEmailService } from 'utils/services/customer-email.service';

@Module({
  providers: [CustomerEmailService],
  exports: [CustomerEmailService],
})
export class CustomerEmailModule {}
