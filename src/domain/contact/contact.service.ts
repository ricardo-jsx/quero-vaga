import { Injectable } from '@nestjs/common';
import { Contato } from '@prisma/client';

import { PrismaService } from '@app/common/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Contato> {
    return await this.prisma.contato.findUnique({
      where: {
        id,
      },
    });
  }
}
