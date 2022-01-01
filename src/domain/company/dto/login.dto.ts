import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class LoginDto {
  @Length(14)
  @IsNumberString()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
