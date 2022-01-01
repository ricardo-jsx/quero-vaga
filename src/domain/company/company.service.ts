import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class CompanyService {
  login(data: LoginDto): string {
    return JSON.stringify(data, null, 2);
  }
}
