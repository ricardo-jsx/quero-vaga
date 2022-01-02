import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CompanyService } from '@app/domain/company/company.service';
import { Company } from '@app/domain/company/zod/company.zod';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompanyService,
    private jwtService: JwtService,
  ) {}

  async validateCompany(cnpj: string, pass: string): Promise<Company> {
    const company = await this.companyService.findOne(cnpj);

    if (company && company.password === pass) {
      return company;
    }

    return null;
  }

  async login(company: LoginDto) {
    const payload = { cnpj: company.cnpj, sub: company.cnpj };

    return { access_token: this.jwtService.sign(payload) };
  }
}
