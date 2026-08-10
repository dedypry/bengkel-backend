import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
  UpdatePhotoProfileDto,
  UpdateProfileDto,
  UserCompanyDto,
} from './dto/user.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createCustomer() {
    return 'sedang proses';
  }

  @Post('company')
  updateUserCompany(@Body() body: UserCompanyDto, @Auth() auth: IAuth) {
    return this.userService.setCompany(body, auth);
  }

  @Post('password')
  changePassword(@Body() body: ChangePasswordDto, @Auth() auth: IAuth) {
    return this.userService.changePassword(body, auth);
  }

  @Post('profile')
  changeProfile(@Body() body: UpdateProfileDto, @Auth() auth: IAuth) {
    return this.userService.updateProfile(body, auth);
  }
  @Patch('photo-profile')
  changePhotoProfile(@Body() body: UpdatePhotoProfileDto, @Auth() auth: IAuth) {
    return this.userService.updateCustomerPhotoProfile(body, auth);
  }

  @Get('sessions')
  listSessions(
    @Auth() auth: IAuth,
    @Headers('authorization') authorization?: string,
  ) {
    const token = authorization?.replace(/^Bearer\s+/i, '') || '';
    return this.userService.listSessions(auth, token);
  }

  @Post('sessions/revoke-all')
  revokeAllSessions(@Auth() auth: IAuth) {
    return this.userService.revokeAllSessions(auth);
  }

  @Delete('sessions/:id')
  revokeSession(
    @Param('id') id: string,
    @Auth() auth: IAuth,
    @Headers('authorization') authorization?: string,
  ) {
    const token = authorization?.replace(/^Bearer\s+/i, '') || '';
    return this.userService.revokeSession(auth, Number(id), token);
  }

  @Post('logout')
  logout(
    @Auth() auth: IAuth,
    @Headers('authorization') authorization?: string,
  ) {
    const token = authorization?.replace(/^Bearer\s+/i, '') || '';
    return this.userService.revokeCurrentSession(auth, token);
  }
}
