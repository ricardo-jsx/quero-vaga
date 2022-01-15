import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common/common.module';

import { JobOpportunityController } from './job-opportunity.controller';
import { JobOpportunityService } from './job-opportunity.service';
import { GetCompanyJobOpportunityUseCase } from './get-company-job-opportunity.use-case';

@Module({
  imports: [CommonModule],
  controllers: [JobOpportunityController],
  providers: [JobOpportunityService, GetCompanyJobOpportunityUseCase],
})
export class JobOpportunityModule {}
