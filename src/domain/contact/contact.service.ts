import { Injectable } from '@nestjs/common';
import { Contato } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';
import { CreateContactRequestDto } from './dto/create-contact.request.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Contato | null> {
    return await this.prisma.contato.findUnique({
      where: {
        id,
      },
    });
  }

  async createCompanyContact(cnpj: string, data: CreateContactRequestDto) {
    return await this.prisma.empresa.update({
      where: { cnpj },
      data: {
        contato: {
          create: {
            email: data.email,
            localizacao: data.localizacao,
            telefone: data.telefone,
            linkedInUrl: data.linkedInUrl,
            websiteUrl: data.websiteUrl,
          },
        },
      },
    });
  }
}
