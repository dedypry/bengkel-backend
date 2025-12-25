import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Get('profile')
  profile(@Auth() auth: IAuth) {
    return this.authService.profile(auth.id);
  }
}
