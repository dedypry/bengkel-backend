import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCompanyDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('company')
  async updateUserCompany(@Body() body: UserCompanyDto, @Auth() auth: IAuth) {
    await this.userService.setCompany(body, auth);

    return 'Company berhasil di update';
  }
}
