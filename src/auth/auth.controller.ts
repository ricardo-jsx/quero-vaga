import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller({ path: '/api/v1/auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
