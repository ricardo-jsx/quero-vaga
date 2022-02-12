import { Injectable } from '@nestjs/common';

import { JobOpportunityService } from '@app/domain/job-opportunity/job-opportunity.service';

import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';
import { Pin } from '../../lib/value-object/pin';

export enum CreateJobApplicationResponse {
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
  ): Promise<CreateJobApplicationResponse | Pin> {
    const jobOpportunity = await this.jobOpportunityService.findOneById(
      body.idVaga,
    );

    if (!jobOpportunity) {
      return CreateJobApplicationResponse.JOB_OPPORTUNITY_NOT_FOUND;
    }

    const pin = await this.generatePin();
    const candidate = await this.service.createJobApplicationCandidate(body);

    await this.service.addCandidateToJobApplication({
      candidateId: candidate.id,
      jobOpportunityId: jobOpportunity.id,
      pin: pin.toString(),
    });

    return pin;
  }

  async generatePin(): Promise<Pin> {
    const pin = Array(6)
      .fill(null)
      .map(() => Math.floor(Math.random() * 10))
      .join('');

    const jobApplication = await this.service.findOneByPin(pin);

    if (jobApplication.isDefined) return await this.generatePin();

    return Pin.new(pin);
  }
}
