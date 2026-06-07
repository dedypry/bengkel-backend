import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { PaginationPipe } from 'utils/pipe/pagination.pipe';
import {
  AttendanceQueryDto,
  DeviceDto,
  ManualAttendanceDto,
  MapPinDto,
} from './dto/attendance.dto';

@UseGuards(AuthGuard)
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  list(
    @Auth() auth: IAuth,
    @Query(new PaginationPipe()) query: AttendanceQueryDto,
  ) {
    return this.attendanceService.list(auth, query);
  }

  @Get('summary')
  summary(@Auth() auth: IAuth, @Query() query: AttendanceQueryDto) {
    return this.attendanceService.summary(auth, query);
  }

  @Get('logs')
  logs(
    @Auth() auth: IAuth,
    @Query(new PaginationPipe()) query: AttendanceQueryDto,
  ) {
    return this.attendanceService.logs(auth, query);
  }

  @Get('devices')
  devices(@Auth() auth: IAuth) {
    return this.attendanceService.devices(auth);
  }

  @Post('devices')
  async upsertDevice(@Body() body: DeviceDto, @Auth() auth: IAuth) {
    const device = await this.attendanceService.upsertDevice(body, auth);

    return {
      message: 'Mesin absensi berhasil disimpan',
      data: device,
    };
  }

  @Delete('devices/:id')
  async destroyDevice(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.attendanceService.destroyDevice(id, auth);

    return 'Mesin absensi berhasil dihapus';
  }

  @Post('map-pin')
  async mapPin(@Body() body: MapPinDto, @Auth() auth: IAuth) {
    await this.attendanceService.mapPin(body, auth);

    return 'PIN mesin berhasil dipetakan ke karyawan';
  }

  @Post()
  async upsertManual(@Body() body: ManualAttendanceDto, @Auth() auth: IAuth) {
    const data = await this.attendanceService.upsertManual(body, auth);

    return {
      message: 'Absensi berhasil disimpan',
      data,
    };
  }

  @Delete(':id')
  async destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    await this.attendanceService.destroy(id, auth);

    return 'Absensi berhasil dihapus';
  }
}
