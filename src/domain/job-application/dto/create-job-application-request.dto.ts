import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateContactRequestDto } from '@app/domain/contact/dto/create-contact.request.dto';

export class CreateJobApplicationRequestDto {
  @IsInt()
  idVaga: number;

  @IsString()
  @Length(11, 11, { message: 'cpf deve conter 11 caracteres' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsString()
  @IsNotEmpty()
  educacao: string;

  @ValidateNested()
  @Type(() => CreateContactRequestDto)
  contato: CreateContactRequestDto;
}
