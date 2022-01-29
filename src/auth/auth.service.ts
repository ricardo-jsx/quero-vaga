import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Company } from '@app/domain/company/zod/company.zod';
import { S3CompanyService } from '@app/s3/company/s3-company.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private s3Service: S3CompanyService,
    private jwtService: JwtService,
  ) {}

  async validateCompany(cnpj: string, pass: string): Promise<Company | null> {
    const company = await this.s3Service.get(cnpj);

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
