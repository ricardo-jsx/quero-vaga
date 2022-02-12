import { Injectable } from '@nestjs/common';
import { Option } from 'monapt';

import { CompanyService } from './company.service';

export enum CreateCompanyResponseCode {
  SUCCESS = 'SUCCESS',
  DUPLICATE_COMPANY = 'DUPLICATE_COMPANY',
}

@Injectable()
export class GetJobApplicationUseCase {
  constructor(private readonly companyService: CompanyService) {}

  async execute(id: number, cnpj: string) {
    const response = await this.companyService.findJobApplications(id, cnpj);

    return Option(response);
  }
}
