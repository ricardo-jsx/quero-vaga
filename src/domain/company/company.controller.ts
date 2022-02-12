import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';

import { CreateCompanyRequestDto } from './dto/create-company.request.dto';
import { GetCompanyRequestDto } from './dto/get-company-request.dto';
import { GetCompanyUseCase } from './get-company.use-case';
import {
  CreateCompanyUseCase,
  CreateCompanyResponseCode,
} from './create-company.use-case';
import { GetJobApplicationUseCase } from './get-job-application.use-case';

@Controller({ path: '/api/v1/company' })
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly getJobApplication: GetJobApplicationUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async getProfile(@Request() req: GetCompanyRequestDto) {
    const empresa = await this.getCompanyUseCase.execute(req);

    if (!empresa)
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);

    return empresa;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/job-application/:id')
  @HttpCode(200)
  async getJobApplicationById(
    @Request() req: GetCompanyRequestDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const candidatura = await this.getJobApplication.execute(id, req.user.cnpj);

    if (candidatura.isEmpty)
      throw new HttpException(
        'Vaga não encontrada para a empresa',
        HttpStatus.NOT_FOUND,
      );

    return candidatura.get();
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
