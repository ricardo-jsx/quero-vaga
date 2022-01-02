import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Company } from '@app/domain/company/zod/company.zod';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'cnpj' });
  }

  async validate(cnpj: string, password: string): Promise<Company> {
    const user = await this.authService.validateCompany(cnpj, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
