import { Injectable } from '@nestjs/common';

import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { JobOpportunityService } from './job-opportunity.service';
import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';
import { CompanyService } from '../company/company.service';

export enum CreateJobOpportunityResponse {
  SUCCESS = 'success',
  COMPANY_HAS_NO_CONTACT = 'company_has_no_contact',
}

@Injectable()
export class PostCompanyJobOpportunityUseCase {
  constructor(
    private readonly service: JobOpportunityService,
    private readonly companyService: CompanyService,
  ) {}

  async execute(
    req: CompanyTokenRequestDto,
    body: CreateJobOpportunityRequestDto,
  ): Promise<CreateJobOpportunityResponse> {
    const company = await this.companyService.findOne(req.user.cnpj);

    if (!company.contatoId) {
      return CreateJobOpportunityResponse.COMPANY_HAS_NO_CONTACT;
    }

    await this.service.createCompanyJobOpportunity(req.user.cnpj, body);

    return CreateJobOpportunityResponse.SUCCESS;
  }
}
