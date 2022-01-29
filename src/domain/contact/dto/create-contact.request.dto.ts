import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateContactRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @IsMobilePhone('pt-BR')
  @IsNotEmpty()
  telefone: string;

  @IsUrl()
  @IsOptional()
  linkedInUrl: string;

  @IsUrl()
  @IsOptional()
  websiteUrl: string;
}
