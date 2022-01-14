import { Module } from '@nestjs/common';

import { S3CompanyService } from './company/s3-company.service';
import { S3CompanyRepository } from './company/s3-company.repository';

@Module({
  providers: [S3CompanyService, S3CompanyRepository],
  exports: [S3CompanyService],
})
export class S3Module {}
