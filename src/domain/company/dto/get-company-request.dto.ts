import * as z from 'zod';

export const GetCompanyRequestDto = z.object({
  user: z.object({
    cnpj: z.string(),
  }),
});

export type GetCompanyRequestDto = z.infer<typeof GetCompanyRequestDto>;
