import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';

@Controller({ path: '/api/v1/company' })
export class CompanyController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
