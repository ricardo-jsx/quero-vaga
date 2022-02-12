import { Module } from '@nestjs/common';

import { S3Module } from '@app/s3/s3.module';
import { CommonModule } from '@app/common/common.module';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CreateCompanyUseCase } from './create-company.use-case';
import { GetCompanyUseCase } from './get-company.use-case';
import { GetJobApplicationUseCase } from './get-job-application.use-case';

@Module({
  imports: [S3Module, CommonModule],
  exports: [CompanyService],
  controllers: [CompanyController],
  providers: [
    GetCompanyUseCase,
    CreateCompanyUseCase,
    GetJobApplicationUseCase,
    CompanyService,
  ],
})
export class CompanyModule {}
