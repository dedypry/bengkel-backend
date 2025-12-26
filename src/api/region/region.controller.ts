import { Controller, Get, Param } from '@nestjs/common';
import { RegionService } from './region.service';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('province')
  province() {
    return this.regionService.getProvince();
  }

  @Get(':id/city')
  city(@Param('id') id: number) {
    return this.regionService.getCity(id);
  }

  @Get(':id/district')
  disctrict(@Param('id') id: number) {
    return this.regionService.getDistrict(id);
  }
}
