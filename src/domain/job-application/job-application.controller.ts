import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pin } from '@app/lib/value-object/pin';

import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';
import { GetCandidateJobApplicationUseCase } from './get-candidate-job-application.use-case';
import {
  CreateJobApplicationResponse,
  PostCandidateJobApplicationUseCase,
} from './post-candidate-job-application.use-case';
import { PostUploadCvUseCase } from './post-upload-cv.use-case';
import { PinDTO } from './dto/pin-dto';

@Controller({ path: '/api/v1/job-application' })
export class JobApplicationController {
  constructor(
    private readonly createCandidateJobApplicationUseCase: PostCandidateJobApplicationUseCase,
    private readonly getJobApplicationByPinUseCase: GetCandidateJobApplicationUseCase,
    private readonly uploadCVUseCase: PostUploadCvUseCase,
  ) {}

  @Post('/candidate')
  @HttpCode(201)
  async apply(@Body() body: CreateJobApplicationRequestDto) {
    const response = await this.createCandidateJobApplicationUseCase.execute(
      body,
    );

    if (response instanceof Pin) {
      return response;
    }

    if (response === CreateJobApplicationResponse.JOB_OPPORTUNITY_NOT_FOUND) {
      throw new HttpException('Vaga não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/pin/:pin')
  async getJobApplicationByPin(@Param() pinDTO: PinDTO) {
    const response = await this.getJobApplicationByPinUseCase.execute(
      pinDTO.pin,
    );

    if (response.isEmpty)
      throw new HttpException(
        'Candidatura não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return response.get();
  }

  @Post('/pin/:pin/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param() pinDTO: PinDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException(
        'Arquivo enviado tem formato não suportado',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.uploadCVUseCase.execute(pinDTO.pin, file);
  }
}

// const uploadCVOptions: MulterOptions = {
//   fileFilter(req, file, cb) {
//     cb(null, file.mimetype === 'application/pdf');
//   },
// };
