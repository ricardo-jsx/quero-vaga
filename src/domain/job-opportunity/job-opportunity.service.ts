import { Injectable } from '@nestjs/common';
import { Vaga } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

@Injectable()
export class JobOpportunityService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyJobOpportunity(cnpj: string): Promise<Vaga[]> {
    console.log('cnpj is', cnpj);

    return await this.prisma.vaga.findMany({
      where: {
        Empresa: {
          cnpj,
        },
      },
    });
  }
}
