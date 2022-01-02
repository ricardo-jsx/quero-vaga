import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyRepositoryLocal } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepositoryLocal],
  exports: [CompanyService],
})
export class CompanyModule {}
