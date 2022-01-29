import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';
import {
  CreateJobApplicationResponse,
  PostCandidateJobApplicationUseCase,
} from './post-candidate-job-application.use-case';

@Controller({ path: '/api/v1/job-application' })
export class JobApplicationController {
  constructor(
    private readonly createCandidateJobApplicationUseCase: PostCandidateJobApplicationUseCase,
  ) {}

  @Post('/candidate')
  @HttpCode(201)
  async create(@Body() body: CreateJobApplicationRequestDto) {
    const response = await this.createCandidateJobApplicationUseCase.execute(
      body,
    );

    if (response === CreateJobApplicationResponse.JOB_OPPORTUNITY_NOT_FOUND) {
      throw new HttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
