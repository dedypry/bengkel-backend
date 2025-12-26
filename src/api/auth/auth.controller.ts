import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Auth() auth: IAuth) {
    return this.authService.profile(auth.id);
  }
}
