import * as z from 'zod';

export const Company = z.object({
  cnpj: z.string().length(14),
  password: z.string(),
});

export type Company = z.infer<typeof Company>;
