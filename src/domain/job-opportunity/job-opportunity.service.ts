import { Injectable } from '@nestjs/common';
import { Empresa, StatusVaga, Vaga } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

import { CreateJobOpportunityRequestDto } from './dto/create-job-opportunity-request.dto';
import { FilterJobOpportunitiesDto } from './dto/filter-job-opportunities.dto';

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

  async findOneById(id: number): Promise<Vaga | null> {
    return await this.prisma.vaga.findUnique({
      where: { id },
    });
  }

  async filterJobOpportunities(filter: FilterJobOpportunitiesDto) {
    console.log('filter is', filter);

    return await this.prisma.vaga.findMany({
      where: {
        status: 'ABERTA',
        AND: [
          { titulo: { contains: filter.titulo, mode: 'insensitive' } },
          { descricao: { contains: filter.descricao, mode: 'insensitive' } },
          { beneficios: { contains: filter.beneficios, mode: 'insensitive' } },
          {
            Empresa: {
              contato: {
                localizacao: {
                  contains: filter.localizacao,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
    });
  }
}
