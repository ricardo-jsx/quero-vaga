import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';
import { GetCandidateJobApplicationUseCase } from './get-candidate-job-application.use-case';
import {
  CreateJobApplicationResponse,
  PostCandidateJobApplicationUseCase,
} from './post-candidate-job-application.use-case';

@Controller({ path: '/api/v1/job-application' })
export class JobApplicationController {
  constructor(
    private readonly createCandidateJobApplicationUseCase: PostCandidateJobApplicationUseCase,
    private readonly getJobApplicationByPinUseCase: GetCandidateJobApplicationUseCase,
  ) {}

  @Post('/candidate')
  @HttpCode(201)
  async apply(@Body() body: CreateJobApplicationRequestDto) {
    const response = await this.createCandidateJobApplicationUseCase.execute(
      body,
    );

    if (response === CreateJobApplicationResponse.JOB_OPPORTUNITY_NOT_FOUND) {
      throw new HttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
    }

    return;
  }

  @Get('/pin/:pin')
  async getJobApplicationByPin(@Param('pin') pin: string) {
    const response = await this.getJobApplicationByPinUseCase.execute(pin);

    if (response.isEmpty)
      throw new HttpException(
        'Candidatura não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return response.get();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/job-application/:id')
  // @HttpCode(200)
  // async getJobApplicationById(
  //   @Request() req: GetCompanyRequestDto,
  //   @Param('id') id: number,
  // ) {
  //   const candidatura = await this.getJobApplication.execute(id, req.user.cnpj);

  //   if (candidatura.isEmpty)
  //     throw new HttpException(
  //       'Vaga não encontrada para a empresa',
  //       HttpStatus.NOT_FOUND,
  //     );

  //   return candidatura.get();
  // }
}
