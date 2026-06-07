import { Injectable, Logger } from '@nestjs/common';
import { AttendanceDevicesModel } from 'models/attendance-devices.model';
import { AttendanceLogsModel } from 'models/attendance-logs.model';
import dayjs from 'utils/helpers/dayjs';
import { AttendanceService } from './attendance.service';

const TZ = 'Asia/Jakarta';

/**
 * Implementasi protokol ADMS (push protocol mesin fingerprint/face ZKTeco).
 * Mesin berkomunikasi via HTTP polos ke endpoint /iclock tanpa autentikasi JWT.
 */
@Injectable()
export class AdmsService {
  private readonly logger = new Logger('ADMS');

  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * Handshake awal: mesin meminta konfigurasi operasional.
   * GET /iclock/cdata?SN=xxxx&options=all
   */
  async handshake(sn: string): Promise<string> {
    await this.touchDevice(sn);

    return (
      [
        `GET OPTION FROM: ${sn}`,
        'Stamp=9999',
        'OpStamp=9999',
        'ErrorDelay=30',
        'Delay=10',
        'TransTimes=00:00;14:05',
        'TransInterval=1',
        'TransFlag=TransData AttLog OpLog AttPhoto EnrollUser ChgUser EnrollFP ChgFP UserPic',
        'TimeZone=7',
        'Realtime=1',
        'Encrypt=0',
      ].join('\n') + '\n'
    );
  }

  /**
   * Mesin mem-push data. table=ATTLOG berisi rekaman absensi.
   * POST /iclock/cdata?SN=xxxx&table=ATTLOG
   */
  async receiveData(sn: string, table: string, body: string): Promise<string> {
    const device = await this.touchDevice(sn);

    if ((table || '').toUpperCase() === 'ATTLOG') {
      const count = await this.ingestAttlog(device, body);

      return `OK: ${count}`;
    }

    // OPERLOG / USERINFO / options dll cukup di-ack
    return 'OK';
  }

  /**
   * Mesin menanyakan apakah ada perintah dari server.
   * GET /iclock/getrequest?SN=xxxx
   */
  async getRequest(sn: string): Promise<string> {
    await this.touchDevice(sn);

    // Belum ada antrian perintah ke mesin
    return 'OK';
  }

  /**
   * ACK hasil eksekusi perintah dari mesin.
   * POST /iclock/devicecmd?SN=xxxx
   */
  async deviceCmd(sn: string): Promise<string> {
    await this.touchDevice(sn);

    return 'OK';
  }

  // ===================== INTERNAL =====================

  private async touchDevice(sn: string): Promise<AttendanceDevicesModel> {
    const now = new Date().toISOString();

    let device = await AttendanceDevicesModel.query()
      .where('serial_number', sn)
      .first();

    if (!device) {
      device = await AttendanceDevicesModel.query().insertAndFetch({
        serial_number: sn,
        name: `Mesin ${sn}`,
        last_seen_at: now,
        is_active: true,
      } as any);
    } else {
      await device.$query().patch({ last_seen_at: now } as any);
    }

    return device;
  }

  /**
   * Parse payload ATTLOG. Tiap baris dipisah TAB:
   * PIN \t YYYY-MM-DD HH:mm:ss \t status \t verify \t workcode ...
   */
  private async ingestAttlog(
    device: AttendanceDevicesModel,
    body: string,
  ): Promise<number> {
    if (!body || !body.trim()) return 0;

    const lines = body
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    let processed = 0;

    for (const line of lines) {
      const cols = line.split('\t');
      if (cols.length < 2) continue;

      const pin = (cols[0] || '').trim();
      const timeStr = (cols[1] || '').trim();
      const status = (cols[2] || '').trim();
      const verify = (cols[3] || '').trim();
      const workCode = (cols[4] || '').trim();

      const parsed = dayjs.tz(timeStr, TZ);
      if (!parsed.isValid()) {
        this.logger.warn(
          `Invalid punch time "${timeStr}" from ${device.serial_number}`,
        );
        continue;
      }
      const punchTime = parsed.toISOString();

      const user = await this.attendanceService.resolveUserByPin(
        pin,
        device.company_id,
      );

      await AttendanceLogsModel.query().insert({
        company_id: device.company_id,
        device_id: device.id,
        serial_number: device.serial_number,
        pin,
        user_id: user?.id,
        punch_time: punchTime,
        status,
        verify_mode: verify,
        work_code: workCode,
        source: 'machine',
        raw: line,
      } as any);

      if (user) {
        await this.attendanceService.applyPunch({
          company_id: device.company_id,
          user_id: user.id,
          punch_time: punchTime,
          source: 'machine',
        });
      }

      processed += 1;
    }

    return processed;
  }
}
