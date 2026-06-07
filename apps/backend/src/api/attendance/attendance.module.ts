import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { IclockController } from './iclock.controller';
import { AttendanceService } from './attendance.service';
import { AdmsService } from './adms.service';

@Module({
  controllers: [AttendanceController, IclockController],
  providers: [AttendanceService, AdmsService],
})
export class AttendanceModule {}
