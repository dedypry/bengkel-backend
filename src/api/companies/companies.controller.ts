import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import { UsersModel } from 'models/users.model';
import { AuthGuard } from 'src/guards/auth.guard';
import type { IAuth } from 'utils/interfaces/IAuth';

@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get(':id')
  detail(@Param('id') id: number, @Auth() auth: IAuth) {
    return this.companiesService.detail(id, auth);
  }
  @Post()
  async create(@Body() body: CreateCompanyDto, @Auth() auth: UsersModel) {
    await this.companiesService.create(body, auth);

    return 'data perusahaan berhasil tersimpan';
  }

  @Patch()
  update(@Body() body: UpdateCompanyDto, @Auth() auth: IAuth) {
    return this.companiesService.update(body, auth);
  }
}
