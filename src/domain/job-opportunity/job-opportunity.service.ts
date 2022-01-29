import { Injectable } from '@nestjs/common';
import { Empresa, StatusVaga, Vaga } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';

@Injectable()
export class JobOpportunityService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyJobOpportunity(cnpj: string): Promise<Vaga[]> {
    return await this.prisma.vaga.findMany({
      where: {
        Empresa: {
          cnpj,
        },
      },
    });
  }

  async archiveJobOpportunity(id: number): Promise<Vaga> {
    return await this.prisma.vaga.update({
      where: { id },
      data: {
        status: StatusVaga.ENCERRADA,
      },
    });
  }

  async createCompanyJobOpportunity(
    cnpj: string,
    data: CreateJobOpportunityRequestDto,
  ): Promise<Empresa> {
    return await this.prisma.empresa.update({
      where: { cnpj },
      data: {
        vagas: {
          create: {
            status: StatusVaga.ABERTA,
            titulo: data.titulo,
            descricao: data.descricao,
            requisitos: data.requisitos,
            requisitosOpcionais: data.requisitosOpcionais,
            beneficios: data.beneficios,
          },
        },
      },
    });
  }
}
