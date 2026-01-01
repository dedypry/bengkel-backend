import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/company.dto';
import { Auth } from 'utils/decorators/auth.decorator';
import { UsersModel } from 'models/users.model';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() body: CreateCompanyDto, @Auth() auth: UsersModel) {
    await this.companiesService.create(body, auth);

    return 'data perusahaan berhasil tersimpan';
  }
}
