import * as z from 'zod';

import { CreateCompanyRequestDto } from '../../../domain/company/dto/create-company.request.dto';

export const S3CreateCompanyDTO = z.object({
  cnpj: z.string(),
  password: z.string(),
});

export type S3CreateCompanyDTO = z.infer<typeof S3CreateCompanyDTO>;

export function toS3CreateCompanyDTO(
  data: CreateCompanyRequestDto,
): S3CreateCompanyDTO {
  return {
    cnpj: data.cnpj,
    password: data.password,
  };
}
