import { Injectable } from '@nestjs/common';
import { Candidato } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';

@Injectable()
export class JobApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async createJobApplicationCandidate(
    data: CreateJobApplicationRequestDto,
  ): Promise<Candidato> {
    return await this.prisma.candidato.create({
      data: {
        cpf: data.cpf,
        nomeCompleto: data.nomeCompleto,
        educacao: data.educacao,
        contato: {
          create: {
            email: data.contato.email,
            localizacao: data.contato.localizacao,
            telefone: data.contato.telefone,
            linkedInUrl: data.contato.linkedInUrl,
            websiteUrl: data.contato.websiteUrl,
          },
        },
      },
    });
  }
}
