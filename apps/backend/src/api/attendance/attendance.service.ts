import { Injectable, NotFoundException } from '@nestjs/common';
import { AttendancesModel } from 'models/attendances.model';
import { AttendanceDevicesModel } from 'models/attendance-devices.model';
import { AttendanceLogsModel } from 'models/attendance-logs.model';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import dayjs from 'utils/helpers/dayjs';
import {
  AttendanceQueryDto,
  DeviceDto,
  ManualAttendanceDto,
  MapPinDto,
} from './dto/attendance.dto';

const TZ = 'Asia/Jakarta';
const SHIFT_START = '08:00'; // jam masuk standar
const LATE_GRACE_MINUTES = 5; // toleransi keterlambatan

@Injectable()
export class AttendanceService {
  /**
   * Daftar rekap absensi harian (default hari ini bila tanggal tidak diisi).
   */
  async list(auth: IAuth, query: AttendanceQueryDto) {
    const result = await AttendancesModel.query()
      .withGraphFetched('[user.[profile]]')
      .where('attendances.company_id', auth.company_id)
      .modify((builder) => {
        if (query.start_date && query.end_date) {
          builder.whereBetween('attendances.date', [
            query.start_date,
            query.end_date,
          ]);
        } else {
          const date = query.date || dayjs().tz(TZ).format('YYYY-MM-DD');
          builder.where('attendances.date', date);
        }

        if (query.status) {
          builder.where('attendances.status', query.status);
        }

        if (query.q) {
          builder.whereExists(
            UsersModel.query()
              .whereColumn('users.id', 'attendances.user_id')
              .where((b) =>
                b
                  .whereILike('users.name', `%${query.q}%`)
                  .orWhereILike('users.nik', `%${query.q}%`),
              ),
          );
        }
      })
      .orderBy('attendances.date', 'desc')
      .orderBy('attendances.check_in', 'asc')
      .page(query.page, query.pageSize);

    return result;
  }

  /**
   * Ringkasan kehadiran pada tanggal tertentu.
   */
  async summary(auth: IAuth, query: AttendanceQueryDto) {
    const date = query.date || dayjs().tz(TZ).format('YYYY-MM-DD');

    const [{ count: totalEmployees }]: any = await UsersModel.query()
      .where('company_id', auth.company_id)
      .whereNot('type', 'owner')
      .whereNull('deleted_at')
      .count();

    const rows = await AttendancesModel.query()
      .where('company_id', auth.company_id)
      .where('date', date);

    const present = rows.filter((r) => r.status === 'present').length;
    const late = rows.filter((r) => r.status === 'late').length;
    const leave = rows.filter((r) =>
      ['leave', 'sick', 'permit'].includes(r.status || ''),
    ).length;
    const recorded = rows.length;
    const absent = Math.max(0, Number(totalEmployees) - recorded);

    return {
      date,
      total: Number(totalEmployees),
      present,
      late,
      leave,
      absent,
    };
  }

  /**
   * Input / koreksi absensi secara manual.
   */
  async upsertManual(dto: ManualAttendanceDto, auth: IAuth) {
    const user = await UsersModel.query()
      .findById(dto.user_id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!user) throw new NotFoundException('Karyawan tidak ditemukan');

    const checkIn = this.buildTimestamp(dto.date, dto.check_in);
    const checkOut = this.buildTimestamp(dto.date, dto.check_out);

    let status = dto.status;
    if (!status) {
      status = checkIn ? this.resolveStatus(dto.date, checkIn) : 'absent';
    }

    const workMinutes =
      checkIn && checkOut
        ? Math.max(0, dayjs(checkOut).diff(dayjs(checkIn), 'minute'))
        : null;

    const existing = await AttendancesModel.query()
      .where({
        company_id: auth.company_id,
        user_id: dto.user_id,
        date: dto.date,
      })
      .whereNull('deleted_at')
      .first();

    const payload = {
      company_id: auth.company_id,
      user_id: dto.user_id,
      date: dto.date,
      check_in: checkIn,
      check_out: checkOut,
      status,
      work_minutes: workMinutes,
      source: 'manual',
      note: dto.note,
      updated_by: auth.id,
    };

    if (existing) {
      return await existing.$query().patchAndFetch(payload as any);
    }

    return await AttendancesModel.query().insertAndFetch({
      ...payload,
      created_by: auth.id,
    } as any);
  }

  async destroy(id: number, auth: IAuth) {
    const data = await AttendancesModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!data) throw new NotFoundException('Data absensi tidak ditemukan');

    await (data.$query() as any).softDelete();
  }

  /**
   * Log mentah punch yang diterima dari mesin (untuk audit / debug).
   */
  async logs(auth: IAuth, query: AttendanceQueryDto) {
    return await AttendanceLogsModel.query()
      .withGraphFetched('[user,device]')
      .where('attendance_logs.company_id', auth.company_id)
      .modify((builder) => {
        if (query.date) {
          builder.whereRaw(`DATE(punch_time AT TIME ZONE 'Asia/Jakarta') = ?`, [
            query.date,
          ]);
        }
        if (query.q) {
          builder.whereILike('pin', `%${query.q}%`);
        }
      })
      .orderBy('punch_time', 'desc')
      .page(query.page, query.pageSize);
  }

  // ===================== DEVICE MANAGEMENT =====================

  async devices(auth: IAuth) {
    return await AttendanceDevicesModel.query()
      .where((b) =>
        b.where('company_id', auth.company_id).orWhereNull('company_id'),
      )
      .whereNull('deleted_at')
      .orderBy('id', 'desc');
  }

  async upsertDevice(dto: DeviceDto, auth: IAuth) {
    const existing = await AttendanceDevicesModel.query()
      .where('serial_number', dto.serial_number)
      .whereNull('deleted_at')
      .first();

    const payload = {
      company_id: auth.company_id,
      serial_number: dto.serial_number,
      name: dto.name,
      location: dto.location,
      is_active: dto.is_active ?? true,
    };

    if (existing) {
      return await existing.$query().patchAndFetch(payload as any);
    }

    return await AttendanceDevicesModel.query().insertAndFetch(payload as any);
  }

  async destroyDevice(id: number, auth: IAuth) {
    const device = await AttendanceDevicesModel.query()
      .findById(id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!device) throw new NotFoundException('Mesin tidak ditemukan');

    await (device.$query() as any).softDelete();
  }

  /**
   * Petakan PIN mesin ke karyawan agar punch berikutnya otomatis terhubung.
   */
  async mapPin(dto: MapPinDto, auth: IAuth) {
    const user = await UsersModel.query()
      .findById(dto.user_id)
      .where('company_id', auth.company_id)
      .whereNull('deleted_at');

    if (!user) throw new NotFoundException('Karyawan tidak ditemukan');

    await user.$query().patch({ machine_pin: dto.pin } as any);

    // Hubungkan log lama yang belum terpetakan
    await AttendanceLogsModel.query()
      .patch({ user_id: dto.user_id } as any)
      .where('company_id', auth.company_id)
      .where('pin', dto.pin)
      .whereNull('user_id');

    return user;
  }

  // ===================== SHARED HELPERS (dipakai ADMS) =====================

  resolveStatus(date: string, checkIn: string) {
    const shiftStart = dayjs.tz(`${date} ${SHIFT_START}`, TZ);
    const limit = shiftStart.add(LATE_GRACE_MINUTES, 'minute');

    return dayjs(checkIn).isAfter(limit) ? 'late' : 'present';
  }

  buildTimestamp(date: string, time?: string | null): string | null {
    if (!time) return null;
    const normalized = time.length === 5 ? `${time}:00` : time;

    return dayjs.tz(`${date} ${normalized}`, TZ).toISOString();
  }

  async resolveUserByPin(pin: string, companyId?: number | null) {
    return await UsersModel.query()
      .whereNull('deleted_at')
      .modify((b) => {
        if (companyId) b.where('company_id', companyId);
      })
      .where((b) => b.where('machine_pin', pin).orWhere('nik', pin))
      .first();
  }

  /**
   * Terapkan satu punch ke rekap harian (check-in paling awal, check-out paling akhir).
   */
  async applyPunch(params: {
    company_id?: number | null;
    user_id: number;
    punch_time: string;
    source?: string;
  }) {
    const date = dayjs(params.punch_time).tz(TZ).format('YYYY-MM-DD');

    const existing = await AttendancesModel.query()
      .where({
        company_id: params.company_id ?? null,
        user_id: params.user_id,
        date,
      })
      .whereNull('deleted_at')
      .first();

    let checkIn = existing?.check_in;
    let checkOut = existing?.check_out;
    const t = params.punch_time;

    if (!checkIn || dayjs(t).isBefore(dayjs(checkIn))) {
      checkIn = t;
    }
    if (checkIn && dayjs(t).isAfter(dayjs(checkIn))) {
      if (!checkOut || dayjs(t).isAfter(dayjs(checkOut))) {
        checkOut = t;
      }
    }

    const workMinutes =
      checkIn && checkOut
        ? Math.max(0, dayjs(checkOut).diff(dayjs(checkIn), 'minute'))
        : null;

    const payload = {
      company_id: params.company_id ?? null,
      user_id: params.user_id,
      date,
      check_in: checkIn,
      check_out: checkOut,
      status: this.resolveStatus(date, checkIn!),
      work_minutes: workMinutes,
      // Pertahankan sumber manual bila sudah dikoreksi admin
      source: existing?.source === 'manual' ? 'manual' : params.source || 'machine',
    };

    if (existing) {
      return await existing.$query().patchAndFetch(payload as any);
    }

    return await AttendancesModel.query().insertAndFetch(payload as any);
  }
}
