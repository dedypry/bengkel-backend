import { Module } from '@nestjs/common';
import { WaService } from './wa.service';
import { WaController } from './wa.controller';

@Module({
  controllers: [WaController],
  providers: [WaService],
})
export class WaModule {}
