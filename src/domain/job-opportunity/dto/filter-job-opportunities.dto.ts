import { IsOptional, IsString } from 'class-validator';

export class FilterJobOpportunitiesDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @IsOptional()
  localizacao: string;

  @IsString()
  @IsOptional()
  beneficios: string;

  @IsString()
  @IsOptional()
  descricao: string;
}
