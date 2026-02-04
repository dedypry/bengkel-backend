import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  consult(@Body() body: any) {
    return this.aiService.consultProblem(body.msg);
  }
}
