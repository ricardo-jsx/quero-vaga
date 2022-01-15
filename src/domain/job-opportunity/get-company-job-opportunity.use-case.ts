import { Injectable } from '@nestjs/common';

import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { JobOpportunityService } from './job-opportunity.service';

@Injectable()
export class GetCompanyJobOpportunityUseCase {
  constructor(private readonly service: JobOpportunityService) {}

  async execute(req: CompanyTokenRequestDto) {
    return this.service.getCompanyJobOpportunity(req.user.cnpj);
  }
}
