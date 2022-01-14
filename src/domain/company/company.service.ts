import { Injectable } from '@nestjs/common';

import { S3CompanyService } from '@app/s3/company/s3-company.service';

import { Company } from './zod/company.zod';

@Injectable()
export class CompanyService {
  constructor(private readonly s3Service: S3CompanyService) {}

  async findOne(cnpj: string): Promise<Company> {
    return await this.s3Service.get(cnpj);
  }
}
