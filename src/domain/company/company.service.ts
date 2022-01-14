import { Injectable } from '@nestjs/common';

import { CompanyRepositoryLocal } from './company.repository';
import { Company } from './zod/company.zod';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepositoryLocal) {}

  async findOne(cnpj: string): Promise<Company> {
    return await this.companyRepository.findOne(cnpj);
  }
}
