import { Injectable } from '@nestjs/common';

import { S3CompanyService } from '@app/s3/company/s3-company.service';

import { CompanyService } from './company.service';
import { CreateCompanyRequestDto } from './dto/create-company.request.dto';

export enum CreateCompanyResponseCode {
  SUCCESS = 'SUCCESS',
  DUPLICATE_COMPANY = 'DUPLICATE_COMPANY',
}

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    private readonly companyService: CompanyService,
    private readonly s3CompanyService: S3CompanyService,
  ) {}

  async execute(
    data: CreateCompanyRequestDto,
  ): Promise<CreateCompanyResponseCode> {
    const company = await this.companyService.findOne(data.cnpj);

    if (company) return CreateCompanyResponseCode.DUPLICATE_COMPANY;

    // await this.s3CompanyService.createBucket();
    await this.s3CompanyService.upload(data);

    // TODO: and Postgres

    return CreateCompanyResponseCode.SUCCESS;
  }
}
