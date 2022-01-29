import { Injectable } from '@nestjs/common';

import { JobOpportunityService } from '@app/domain/job-opportunity/job-opportunity.service';

import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';

export enum CreateJobApplicationResponse {
  SUCCESS = 'success',
  JOB_OPPORTUNITY_NOT_FOUND = 'job_opportunity_not_found',
}

@Injectable()
export class PostCandidateJobApplicationUseCase {
  constructor(
    private readonly service: JobApplicationService,
    private readonly jobOpportunityService: JobOpportunityService,
  ) {}

  async execute(
    body: CreateJobApplicationRequestDto,
  ): Promise<CreateJobApplicationResponse> {
    const jobOpportunity = await this.jobOpportunityService.findOneById(
      body.idVaga,
    );

    if (!jobOpportunity) {
      return CreateJobApplicationResponse.JOB_OPPORTUNITY_NOT_FOUND;
    }

    const candidate = await this.service.createJobApplicationCandidate(body);

    console.log('candidate', candidate);

    return CreateJobApplicationResponse.SUCCESS;
  }
}
