import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';

import { CreateCompanyRequestDto } from './dto/create-company.request.dto';
import {
  CreateCompanyUseCase,
  CreateCompanyResponseCode,
} from './create-company.use-case';

@Controller({ path: '/api/v1/company' })
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async create(@Body() body: CreateCompanyRequestDto) {
    const response = await this.createCompanyUseCase.execute(body);

    if (response === CreateCompanyResponseCode.DUPLICATE_COMPANY) {
      throw new HttpException(
        'Já existe empresa com o mesmo cnpj',
        HttpStatus.CONFLICT,
      );
    }

    return HttpStatus.CREATED;
  }
}
