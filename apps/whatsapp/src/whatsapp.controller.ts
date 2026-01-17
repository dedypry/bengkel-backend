import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller()
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}
  @Get('qr')
  getQr() {
    const data = this.whatsappService.getQrCode();

    if (data.status === 'CONNECTED') {
      return { message: 'Sudah terhubung', status: data.status };
    }

    if (!data.qr) {
      throw new HttpException(
        'QR Code belum siap, coba lagi nanti',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return {
      qr: data.qr,
      status: data.status,
      // Tips: Frontend bisa menggunakan library 'qrcode.react' untuk merender string ini
      instructions:
        'Gunakan string QR ini untuk dikonversi menjadi gambar di frontend',
    };
  }

  @Post('send')
  send() {
    return this.whatsappService.sendMessage({
      to: '6281286141441',
      content: 'hai ini pesan q',
    });
  }
}
