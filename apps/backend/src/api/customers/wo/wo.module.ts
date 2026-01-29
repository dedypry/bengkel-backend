import { Module } from '@nestjs/common';
import { WoService } from './wo.service';
import { WoController } from './wo.controller';

@Module({
  controllers: [WoController],
  providers: [WoService],
})
export class WoModule {}
