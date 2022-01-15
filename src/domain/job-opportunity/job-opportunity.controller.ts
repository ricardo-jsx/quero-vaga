import { Controller, Get, HttpCode, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';

@Controller({ path: '/api/v1/job-opportunity' })
export class JobOpportunityController {
  constructor(
    private readonly getCompanyJobOpportunityUseCase: GetCompanyJobOpportunityUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/company')
  @HttpCode(200)
  async getCompanyJobOpportunity(@Request() req: CompanyTokenRequestDto) {
    return await this.getCompanyJobOpportunityUseCase.execute(req);
  }
}
