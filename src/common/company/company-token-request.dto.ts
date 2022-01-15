import * as z from 'zod';

export const CompanyTokenRequestDto = z.object({
  user: z.object({
    cnpj: z.string(),
  }),
});

export type CompanyTokenRequestDto = z.infer<typeof CompanyTokenRequestDto>;
