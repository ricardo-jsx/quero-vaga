import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobOpportunityRequestDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  requisitos: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  requisitosOpcionais: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  beneficios: string;
}
