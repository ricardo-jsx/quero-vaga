import { Injectable } from '@nestjs/common';
import { S3JobApplicationRepository } from '@app/s3/job-application/s3-job-application.repository';

@Injectable()
export class PostUploadCvUseCase {
  constructor(private readonly repository: S3JobApplicationRepository) {}

  async execute(pin: string, file: Express.Multer.File): Promise<void> {
    await this.repository.upload(pin, file);
  }
}
