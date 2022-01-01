import { Body, Controller, Post } from '@nestjs/common';

import { CompanyService } from './company.service';
import { LoginDto } from './dto/login.dto';

@Controller({ path: '/api/v1/company' })
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post('/login')
  login(@Body() data: LoginDto): string {
    return this.service.login(data);
  }
}
