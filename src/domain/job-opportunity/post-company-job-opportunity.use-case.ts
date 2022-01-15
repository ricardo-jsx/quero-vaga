import { Injectable } from '@nestjs/common';

import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { JobOpportunityService } from './job-opportunity.service';
import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';

@Injectable()
export class PostCompanyJobOpportunityUseCase {
  constructor(private readonly service: JobOpportunityService) {}

  async execute(
    req: CompanyTokenRequestDto,
    body: CreateJobOpportunityRequestDto,
  ) {
    return this.service.createCompanyJobOpportunity(req.user.cnpj, body);
  }
}
