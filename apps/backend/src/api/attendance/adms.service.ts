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
    console.log('[ADMS] handshake', { sn });
    await this.touchDevice(sn);

    const response =
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
      ].join('\n') + '\n';

    console.log('[ADMS] handshake response', { sn, response });
    return response;
  }

  /**
   * Mesin mem-push data. table=ATTLOG berisi rekaman absensi.
   * POST /iclock/cdata?SN=xxxx&table=ATTLOG
   */
  async receiveData(sn: string, table: string, body: string): Promise<string> {
    console.log('[ADMS] receiveData', {
      sn,
      table,
      bodyLength: body?.length ?? 0,
      bodyPreview: (body || '').slice(0, 500),
    });
    const device = await this.touchDevice(sn);

    if ((table || '').toUpperCase() === 'ATTLOG') {
      const count = await this.ingestAttlog(device, body);
      const response = `OK: ${count}`;
      console.log('[ADMS] receiveData ATTLOG done', { sn, count, response });
      return response;
    }

    // OPERLOG / USERINFO / options dll cukup di-ack
    console.log('[ADMS] receiveData ack non-ATTLOG', { sn, table });
    return 'OK';
  }

  /**
   * Mesin menanyakan apakah ada perintah dari server.
   * GET /iclock/getrequest?SN=xxxx
   */
  async getRequest(sn: string): Promise<string> {
    console.log('[ADMS] getRequest', { sn });
    await this.touchDevice(sn);

    // Belum ada antrian perintah ke mesin
    console.log('[ADMS] getRequest response', { sn, response: 'OK' });
    return 'OK';
  }

  /**
   * ACK hasil eksekusi perintah dari mesin.
   * POST /iclock/devicecmd?SN=xxxx
   */
  async deviceCmd(sn: string): Promise<string> {
    console.log('[ADMS] deviceCmd', { sn });
    await this.touchDevice(sn);

    console.log('[ADMS] deviceCmd response', { sn, response: 'OK' });
    return 'OK';
  }

  // ===================== INTERNAL =====================

  private async touchDevice(sn: string): Promise<AttendanceDevicesModel> {
    console.log('[ADMS] touchDevice', { sn });
    const now = new Date().toISOString();

    let device = await AttendanceDevicesModel.query()
      .where('serial_number', sn)
      .first();

    if (!device) {
      console.log('[ADMS] touchDevice create new device', { sn });
      device = await AttendanceDevicesModel.query().insertAndFetch({
        serial_number: sn,
        name: `Mesin ${sn}`,
        last_seen_at: now,
        is_active: true,
      } as any);
    } else {
      console.log('[ADMS] touchDevice update last_seen', {
        sn,
        deviceId: device.id,
        companyId: device.company_id,
      });
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
    console.log('[ADMS] ingestAttlog start', {
      deviceId: device.id,
      sn: device.serial_number,
      companyId: device.company_id,
      bodyLength: body?.length ?? 0,
    });

    if (!body || !body.trim()) {
      console.log('[ADMS] ingestAttlog empty body');
      return 0;
    }

    const lines = body
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    console.log('[ADMS] ingestAttlog lines', { count: lines.length });

    let processed = 0;

    for (const line of lines) {
      const cols = line.split('\t');
      if (cols.length < 2) {
        console.log('[ADMS] ingestAttlog skip short line', { line });
        continue;
      }

      const pin = (cols[0] || '').trim();
      const timeStr = (cols[1] || '').trim();
      const status = (cols[2] || '').trim();
      const verify = (cols[3] || '').trim();
      const workCode = (cols[4] || '').trim();

      console.log('[ADMS] ingestAttlog row', {
        pin,
        timeStr,
        status,
        verify,
        workCode,
      });

      const parsed = dayjs.tz(timeStr, TZ);
      if (!parsed.isValid()) {
        console.log('[ADMS] ingestAttlog invalid time', {
          sn: device.serial_number,
          timeStr,
        });
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
      console.log('[ADMS] ingestAttlog resolveUser', {
        pin,
        userId: user?.id ?? null,
        found: !!user,
      });

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
        console.log('[ADMS] ingestAttlog applyPunch', {
          userId: user.id,
          punchTime,
        });
        await this.attendanceService.applyPunch({
          company_id: device.company_id,
          user_id: user.id,
          punch_time: punchTime,
          source: 'machine',
        });
      } else {
        console.log('[ADMS] ingestAttlog skip applyPunch (user not found)', {
          pin,
        });
      }

      processed += 1;
    }

    console.log('[ADMS] ingestAttlog done', {
      sn: device.serial_number,
      processed,
    });
    return processed;
  }
}
