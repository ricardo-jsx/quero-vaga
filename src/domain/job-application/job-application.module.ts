import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common/common.module';
import { CompanyModule } from '@app/domain/company/company.module';
import { JobOpportunityModule } from '@app/domain/job-opportunity/job-opportunity.module';

import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { PostCandidateJobApplicationUseCase } from './post-candidate-job-application.use-case';

@Module({
  imports: [CommonModule, CompanyModule, JobOpportunityModule],
  exports: [JobApplicationService],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, PostCandidateJobApplicationUseCase],
})
export class JobApplicationModule {}
