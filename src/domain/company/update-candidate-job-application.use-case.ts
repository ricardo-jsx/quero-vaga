import { Injectable } from '@nestjs/common';
import { StatusCandidatura } from '@prisma/client';

import { CompanyService } from './company.service';
import { UpdateCandidateStatusDto } from './dto/update-candidate-status.dto';

export enum UpdateCandidateStatusResponse {
  SUCCESS = 'SUCCESS',
  JOB_APPLICATION_NOT_FOUND = 'JOB_APPLICATION_NOT_FOUND',
}

@Injectable()
export class UpdateCandidateJobApplicationUseCase {
  constructor(private readonly companyService: CompanyService) {}

  async execute(update: UpdateCandidateStatusDto) {
    const candidatura = await this.companyService.findJobApplication(update);

    if (candidatura.isEmpty) {
      return UpdateCandidateStatusResponse.JOB_APPLICATION_NOT_FOUND;
    }

    await this.companyService.updateJobApplicationStatus(update);

    if (update.status === StatusCandidatura.APROVADO) {
      return candidatura.get();
    }

    return UpdateCandidateStatusResponse.SUCCESS;
  }
}
