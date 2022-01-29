import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common/common.module';
import { CompanyModule } from '@app/domain/company/company.module';

import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PostCreateCompanyContactUseCase } from './post-create-company-contact.use-case';

@Module({
  imports: [CommonModule, CompanyModule],
  exports: [ContactService],
  controllers: [ContactController],
  providers: [ContactService, PostCreateCompanyContactUseCase],
})
export class ContactModule {}
