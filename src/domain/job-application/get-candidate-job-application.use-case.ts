import { Injectable } from '@nestjs/common';
import { Candidatura } from '@prisma/client';
import { Option } from 'monapt';

import { JobApplicationService } from './job-application.service';

@Injectable()
export class GetCandidateJobApplicationUseCase {
  constructor(private readonly service: JobApplicationService) {}

  async execute(pin: string): Promise<Option<Candidatura>> {
    return await this.service.findOneByPin(pin);
  }
}
