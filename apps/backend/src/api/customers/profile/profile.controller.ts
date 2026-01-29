import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'utils/guards/auth.guard';
import { ChangePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('customers/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('update')
  updateProfile(@Body() body: UpdateProfileDto, @Auth() auth: IAuth) {
    return this.profileService.updateProfile(body, auth);
  }

  @Patch('change-password')
  changePassword(@Body() body: ChangePasswordDto, @Auth() auth: IAuth) {
    return this.profileService.changePassword(body, auth);
  }
}
