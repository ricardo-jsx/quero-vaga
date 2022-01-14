import { Injectable } from '@nestjs/common';

import { CreateCompanyRequestDto } from '@app/domain/company/dto/create-company.request.dto';

import {
  S3CreateCompanyDTO,
  toS3CreateCompanyDTO,
} from './dto/s3-create-company.dto';
import { S3CompanyRepository } from './s3-company.repository';

@Injectable()
export class S3CompanyService {
  constructor(private readonly repository: S3CompanyRepository) {}

  async createBucket(): Promise<void> {
    return await this.repository.createBucket();
  }

  async upload(data: CreateCompanyRequestDto): Promise<void> {
    const upload = toS3CreateCompanyDTO(data);

    return await this.repository.upload(upload);
  }

  async get(cnpj: string): Promise<S3CreateCompanyDTO> {
    return await this.repository.get(cnpj);
  }
}
