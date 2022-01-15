import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';
import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';
import { PostCompanyJobOpportunityUseCase } from './post-company-job-opportunity.use-case';

@Controller({ path: '/api/v1/job-opportunity' })
export class JobOpportunityController {
  constructor(
    private readonly getCompanyJobOpportunityUseCase: GetCompanyJobOpportunityUseCase,
    private readonly postCompanyJobOpportunityUseCase: PostCompanyJobOpportunityUseCase,
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
}
