import { IsEnum, IsOptional, IsString, Validate } from 'class-validator';

import { PinValidator } from '@app/lib/class-validator/pin-validator';
import { StatusCandidatura } from '@prisma/client';

export class UpdateCandidateStatusDto {
  @IsString()
  @IsOptional()
  cnpj: string;

  @Validate(PinValidator)
  pin: string;

  @IsEnum(StatusCandidatura)
  status: StatusCandidatura;
}
