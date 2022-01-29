import { Injectable } from '@nestjs/common';

import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { JobOpportunityService } from './job-opportunity.service';
import { ArchiveJobOpportunityRequestDto } from './dto/archive-job-opportunity-request.dto';

export enum ArchiveVagaResponse {
  SUCCESS = 'success',
  NOT_AUTHORIZED = 'not_authorized',
}

@Injectable()
export class PutCompanyArchiveJobOpportunityUseCase {
  constructor(private readonly service: JobOpportunityService) {}

  async execute(
    req: CompanyTokenRequestDto,
    body: ArchiveJobOpportunityRequestDto,
  ): Promise<ArchiveVagaResponse> {
    const jobOpportunities = await this.service.getCompanyJobOpportunity(
      req.user.cnpj,
    );

    if (jobOpportunities.some(opportunity => opportunity.id === body.id)) {
      await this.service.archiveJobOpportunity(body.id);

      return ArchiveVagaResponse.SUCCESS;
    }

    return ArchiveVagaResponse.NOT_AUTHORIZED;
  }
}
