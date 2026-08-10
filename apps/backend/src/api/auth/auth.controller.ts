import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import {
  AuthCustomerDto,
  AuthDto,
  RegisterDto,
  ResetPasswordDto,
  SendForgotEmailDto,
  VerifyCodeDto,
} from './dto/auth.dto';
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
  login(@Body() body: AuthDto, @Req() req: Request) {
    return this.authService.login(body, req);
  }

  @Post('login/customer')
  loginCustomer(@Body() body: AuthCustomerDto) {
    return this.authService.loginCustomer(body);
  }

  @Post('register')
  registerCustomer(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: SendForgotEmailDto) {
    this.authService.sendForgotEmail(body);

    return `kami sudah mengirim email ke ${body.email}, Cek secara berkala`;
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.ressetPassword(body);
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
