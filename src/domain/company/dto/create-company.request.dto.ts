import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyRequestDto {
  @Length(14, 14, { message: 'CNPJ deve conter 14 caracteres' })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 999, { message: 'A senha deve ter um mínimo de 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  especialidades: string;

  @IsString()
  @IsNotEmpty()
  sobre: string;

  @IsInt()
  numeroFuncionarios: number;
}
