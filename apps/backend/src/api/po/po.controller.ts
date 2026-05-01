import { Controller } from '@nestjs/common';
import { PoService } from './po.service';

@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}
}
