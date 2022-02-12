import { Injectable } from '@nestjs/common';
import { Candidato } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

import { CreateJobApplicationRequestDto } from './dto/create-job-application-request.dto';
import { JobApplicationDTO } from './dto/job-application.dto';

@Injectable()
export class JobApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByPin(pin: string) {
    return await this.prisma.candidatura.findUnique({
      where: { id: pin },
    });
  }

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

  async addCandidateToJobApplication(data: JobApplicationDTO) {
    const { pin, candidateId, jobOpportunityId } = data;

    await this.prisma.vaga.update({
      where: { id: jobOpportunityId },
      data: {
        Candidatura: {
          create: {
            id: pin,
            candidatoId: candidateId,
            cartaApresentacao: 'Hello I want to be hired',
            curriculo: 's3aws-id',
            status: 'NAO_PROCESSADO',
          },
        },
      },
    });
  }
}
