import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';
import {
  CreateJobOpportunityResponse,
  PostCompanyJobOpportunityUseCase,
} from './post-company-job-opportunity.use-case';
import {
  PutCompanyArchiveJobOpportunityUseCase,
  ArchiveVagaResponse,
} from './put-company-archive-job-opportunity.use-case';
import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';
import { ArchiveJobOpportunityRequestDto } from './dto/archive-job-opportunity-request.dto';
import { GetFilteredJobOpportunitiesUseCase } from './get-filtered-job-opportunities.use-case';
import { FilterJobOpportunitiesDto } from './dto/filter-job-opportunities.dto';

@Controller({ path: '/api/v1/job-opportunity' })
export class JobOpportunityController {
  constructor(
    private readonly getCompanyJobOpportunityUseCase: GetCompanyJobOpportunityUseCase,
    private readonly postCompanyJobOpportunityUseCase: PostCompanyJobOpportunityUseCase,
    private readonly putCompanyArchiveJobOpportunityUseCase: PutCompanyArchiveJobOpportunityUseCase,
    private readonly getFilteredJobOpportunitiesUseCase: GetFilteredJobOpportunitiesUseCase,
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
    const response = await this.postCompanyJobOpportunityUseCase.execute(
      req,
      body,
    );

    if (response === CreateJobOpportunityResponse.SUCCESS) return;

    if (response === CreateJobOpportunityResponse.COMPANY_HAS_NO_CONTACT) {
      throw new HttpException(
        'Empresa precisa ter contato para criar uma vaga',
        HttpStatus.FORBIDDEN,
      );
    }
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

  @Get('/filter')
  @HttpCode(200)
  async filterJobOpportunities(@Query() filter: FilterJobOpportunitiesDto) {
    return await this.getFilteredJobOpportunitiesUseCase.execute(filter);
  }
}
