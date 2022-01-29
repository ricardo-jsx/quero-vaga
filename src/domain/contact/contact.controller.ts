import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { CompanyTokenRequestDto } from '@app/common/company/company-token-request.dto';

import { CreateContactRequestDto } from './dto/create-contact.request.dto';
import {
  PostCreateCompanyContactUseCase,
  CreateCompanyContactResponse,
} from './post-create-company-contact.use-case';

@Controller({ path: '/api/v1/contact' })
export class ContactController {
  constructor(
    private readonly createCompanyContactUseCase: PostCreateCompanyContactUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/company')
  @HttpCode(201)
  async create(
    @Request() req: CompanyTokenRequestDto,
    @Body() body: CreateContactRequestDto,
  ) {
    const response = await this.createCompanyContactUseCase.execute(
      req.user.cnpj,
      body,
    );

    if (response === CreateCompanyContactResponse.ALREADY_HAS_CONTACT) {
      throw new HttpException(
        'Empresa já tem contato criado',
        HttpStatus.CONFLICT,
      );
    }
  }
}
