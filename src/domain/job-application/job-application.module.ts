import { Module } from '@nestjs/common';

import { S3Module } from '@app/s3/s3.module';
import { CommonModule } from '@app/common/common.module';
import { CompanyModule } from '@app/domain/company/company.module';
import { JobOpportunityModule } from '@app/domain/job-opportunity/job-opportunity.module';

import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { PostCandidateJobApplicationUseCase } from './post-candidate-job-application.use-case';
import { GetCandidateJobApplicationUseCase } from './get-candidate-job-application.use-case';
import { PostUploadCvUseCase } from './post-upload-cv.use-case';

@Module({
  imports: [CommonModule, CompanyModule, JobOpportunityModule, S3Module],
  exports: [JobApplicationService],
  controllers: [JobApplicationController],
  providers: [
    JobApplicationService,
    PostCandidateJobApplicationUseCase,
    GetCandidateJobApplicationUseCase,
    PostUploadCvUseCase,
  ],
})
export class JobApplicationModule {}
