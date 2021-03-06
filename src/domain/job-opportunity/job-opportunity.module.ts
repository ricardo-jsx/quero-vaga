import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common/common.module';
import { CompanyModule } from '@app/domain/company/company.module';

import { JobOpportunityController } from './job-opportunity.controller';
import { JobOpportunityService } from './job-opportunity.service';
import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';
import { PostCompanyJobOpportunityUseCase } from './post-company-job-opportunity.use-case';
import { PutCompanyArchiveJobOpportunityUseCase } from './put-company-archive-job-opportunity.use-case';
import { GetFilteredJobOpportunitiesUseCase } from './get-filtered-job-opportunities.use-case';

@Module({
  imports: [CommonModule, CompanyModule],
  exports: [JobOpportunityService],
  controllers: [JobOpportunityController],
  providers: [
    JobOpportunityService,
    GetCompanyJobOpportunityUseCase,
    PostCompanyJobOpportunityUseCase,
    PutCompanyArchiveJobOpportunityUseCase,
    GetFilteredJobOpportunitiesUseCase,
  ],
})
export class JobOpportunityModule {}
