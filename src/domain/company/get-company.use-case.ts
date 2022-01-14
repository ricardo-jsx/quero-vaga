import { Injectable } from '@nestjs/common';

import { CompanyService } from './company.service';
import { GetCompanyRequestDto } from './dto/get-company-request.dto';

export enum CreateCompanyResponseCode {
  SUCCESS = 'SUCCESS',
  DUPLICATE_COMPANY = 'DUPLICATE_COMPANY',
}

@Injectable()
export class GetCompanyUseCase {
  constructor(private readonly companyService: CompanyService) {}

  async execute(data: GetCompanyRequestDto) {
    return this.companyService.findOne(data.user.cnpj);
  }
}
