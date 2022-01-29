import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';
import { PostCompanyJobOpportunityUseCase } from './post-company-job-opportunity.use-case';
import {
  PutCompanyArchiveJobOpportunityUseCase,
  ArchiveVagaResponse,
} from './put-company-archive-job-opportunity.use-case';
import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';
import { ArchiveJobOpportunityRequestDto } from './dto/archive-job-opportunity-request.dto';

@Controller({ path: '/api/v1/job-opportunity' })
export class JobOpportunityController {
  constructor(
    private readonly getCompanyJobOpportunityUseCase: GetCompanyJobOpportunityUseCase,
    private readonly postCompanyJobOpportunityUseCase: PostCompanyJobOpportunityUseCase,
    private readonly putCompanyArchiveJobOpportunityUseCase: PutCompanyArchiveJobOpportunityUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/company')
  @HttpCode(200)
  async getCompanyJobOpportunity(@Request() req: CompanyTokenRequestDto) {
    return await this.getCompanyJobOpportunityUseCase.execute(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/company')
  @HttpCode(201)
  async postCompanyJobOpportunity(
    @Request() req: CompanyTokenRequestDto,
    @Body() body: CreateJobOpportunityRequestDto,
  ) {
    return await this.postCompanyJobOpportunityUseCase.execute(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/archive')
  @HttpCode(200)
  async putArchiveCompanyJobOpportunity(
    @Request() req: CompanyTokenRequestDto,
    @Body() body: ArchiveJobOpportunityRequestDto,
  ) {
    const response = await this.putCompanyArchiveJobOpportunityUseCase.execute(
      req,
      body,
    );

    if (response === ArchiveVagaResponse.SUCCESS) {
      return;
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
