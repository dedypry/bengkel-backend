import { Module } from '@nestjs/common';
import { MechanicsService } from './mechanics.service';
import { MechanicsController } from './mechanics.controller';

@Module({
  controllers: [MechanicsController],
  providers: [MechanicsService],
})
export class MechanicsModule {}
