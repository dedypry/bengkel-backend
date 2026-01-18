import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
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
}
