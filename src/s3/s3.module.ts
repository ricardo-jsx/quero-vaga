import { Module } from '@nestjs/common';

import { S3CompanyService } from './company/s3-company.service';
import { S3CompanyRepository } from './company/s3-company.repository';
import { S3JobApplicationRepository } from './job-application/s3-job-application.repository';

@Module({
  providers: [
    S3CompanyService,
    S3CompanyRepository,
    S3JobApplicationRepository,
  ],
  exports: [S3CompanyService, S3JobApplicationRepository],
})
export class S3Module {}
