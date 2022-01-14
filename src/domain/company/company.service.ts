import { Injectable } from '@nestjs/common';
import { Empresa } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

import { CreateCompanyRequestDto } from './dto/create-company.request.dto';

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

  async findOne(cnpj: string): Promise<Empresa> {
    return await this.prisma.empresa.findUnique({
      where: {
        cnpj,
      },
    });
  }
}
