import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, VerifyCodeDto } from './dto/auth.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';
import { sendWhatsAppMessage } from 'utils/helpers/send-wa';
import { formatPhoneNumber } from 'utils/helpers/format';
import 'dotenv/config';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Post('login/customer')
  loginCustomer(@Body() body: AuthDto) {
    return this.authService.loginCustomer(body);
  }

  @Post('send-verify-code')
  async loginVerifyCode(@Body() body: VerifyCodeDto) {
    const code = await this.authService.generateVerifyCode(body);
    const msg = `
  ${process.env.APP_NAME}

Kode verifikasi Anda adalah: ${code}

Kode ini berlaku selama 5 menit. Jangan berikan kode ini kepada siapa pun, termasuk pihak ${process.env.APP_NAME}.
    `;

    console.log('CODE', msg);

    sendWhatsAppMessage(formatPhoneNumber(body.phone), msg);

    return 'periksa wa anda';
  }
  @Post('verify-code')
  verifyCode(@Body() body: VerifyCodeDto) {
    return this.authService.verfyCode(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Auth() auth: IAuth) {
    return this.authService.profile(auth);
  }
}
