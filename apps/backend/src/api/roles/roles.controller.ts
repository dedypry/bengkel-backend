import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/roles.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import type { IAuth } from 'utils/interfaces/IAuth';
import { AuthGuard } from 'utils/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  list() {
    return this.rolesService.list();
  }

  @Post()
  create(@Body() body: CreateRoleDto, @Auth() auth: IAuth) {
    return this.rolesService.create(body, auth);
  }

  @Delete(':id')
  destroy(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.rolesService.destroy(id, auth);
  }
}
