import { Injectable } from '@nestjs/common';

import { CompanyService } from '@app/domain/company/company.service';

import { CreateContactRequestDto } from './dto/create-contact.request.dto';
import { ContactService } from './contact.service';

export enum CreateCompanyContactResponse {
  ALREADY_HAS_CONTACT = 'ALREADY_HAS_CONTACT',
  SUCCESS = 'SUCCESS',
}

@Injectable()
export class PostCreateCompanyContactUseCase {
  constructor(
    private readonly service: ContactService,
    private readonly companyService: CompanyService,
  ) {}

  async execute(
    cnpj: string,
    data: CreateContactRequestDto,
  ): Promise<CreateCompanyContactResponse> {
    const company = await this.companyService.findOne(cnpj);

    if (company.contatoId) {
      return CreateCompanyContactResponse.ALREADY_HAS_CONTACT;
    }

    await this.service.createCompanyContact(cnpj, data);

    return CreateCompanyContactResponse.SUCCESS;
  }
}
