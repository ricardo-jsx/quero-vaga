import { Module } from '@nestjs/common';

import { S3Module } from '@app/s3/s3.module';

import { CompanyController } from './company.controller';
import { CompanyRepositoryLocal } from './company.repository';
import { CompanyService } from './company.service';
import { CreateCompanyUseCase } from './create-company.use-case';

@Module({
  imports: [S3Module],
  exports: [CompanyService],
  controllers: [CompanyController],
  providers: [CreateCompanyUseCase, CompanyService, CompanyRepositoryLocal],
})
export class CompanyModule {}
