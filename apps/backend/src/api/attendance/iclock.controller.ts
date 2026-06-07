import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AdmsService } from './adms.service';

/**
 * Endpoint protokol ADMS untuk mesin absensi (ZKTeco push protocol).
 *
 * Tanpa AuthGuard karena mesin tidak mengirim JWT. Respons harus berupa
 * teks polos sehingga kita memakai @Res() agar tidak dibungkus oleh
 * ResponseInterceptor global.
 */
@Controller('iclock')
export class IclockController {
  constructor(private readonly admsService: AdmsService) {}

  private sendText(res: Response, text: string) {
    res.set('Content-Type', 'text/plain');
    res.status(200).send(text);
  }

  @Get('cdata')
  async cdataGet(@Query('SN') sn: string, @Res() res: Response) {
    const text = await this.admsService.handshake(sn);
    this.sendText(res, text);
  }

  @Post('cdata')
  async cdataPost(
    @Query('SN') sn: string,
    @Query('table') table: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const body =
      typeof req.body === 'string' ? req.body : (req.body?.toString() ?? '');
    const text = await this.admsService.receiveData(sn, table, body);
    this.sendText(res, text);
  }

  @Get('getrequest')
  async getRequest(@Query('SN') sn: string, @Res() res: Response) {
    const text = await this.admsService.getRequest(sn);
    this.sendText(res, text);
  }

  @Post('devicecmd')
  async deviceCmd(@Query('SN') sn: string, @Res() res: Response) {
    const text = await this.admsService.deviceCmd(sn);
    this.sendText(res, text);
  }

  @Get('ping')
  ping(@Res() res: Response) {
    this.sendText(res, 'OK');
  }
}
