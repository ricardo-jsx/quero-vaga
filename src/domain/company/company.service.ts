import { Injectable } from '@nestjs/common';
import { Candidatura, Empresa } from '@prisma/client';
import { Option } from 'monapt';

import { PrismaService } from '@app/common/prisma.service';

import { CreateCompanyRequestDto } from './dto/create-company.request.dto';
import { UpdateCandidateStatusDto } from './dto/update-candidate-status.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyRequestDto): Promise<Empresa> {
    return await this.prisma.empresa.create({
      data: {
        cnpj: data.cnpj,
        nome: data.nome,
        especialidades: data.especialidades,
        sobre: data.sobre,
        numeroFuncionarios: data.numeroFuncionarios,
      },
    });
  }

  async findOne(cnpj: string): Promise<Empresa | null> {
    return await this.prisma.empresa.findUnique({
      where: {
        cnpj,
      },
      include: {
        contato: true,
      },
    });
  }

  async findJobApplications(id: number, cnpj: string): Promise<Candidatura[]> {
    return await this.prisma.candidatura.findMany({
      where: {
        AND: [
          { vagaId: id },
          {
            idVaga: {
              empresaCnpj: cnpj,
            },
          },
        ],
      },
    });
  }

  async findJobApplication(
    update: UpdateCandidateStatusDto,
  ): Promise<Option<Candidatura>> {
    const candidatura = await this.prisma.candidatura.findFirst({
      where: {
        AND: [
          { id: update.pin },
          {
            idVaga: {
              empresaCnpj: update.cnpj,
            },
          },
        ],
      },
      include: {
        Candidato: {
          include: {
            contato: true,
          },
        },
      },
    });

    return Option(candidatura);
  }

  async updateJobApplicationStatus(update: UpdateCandidateStatusDto) {
    const candidatura = await this.prisma.candidatura.update({
      where: { id: update.pin },
      data: {
        status: update.status,
      },
    });

    return Option(candidatura);
  }
}
