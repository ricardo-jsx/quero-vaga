import * as z from 'zod';

export const JobApplicationDTO = z.object({
  candidateId: z.number(),
  jobOpportunityId: z.number(),
  pin: z.string().length(6),
});

export type JobApplicationDTO = z.infer<typeof JobApplicationDTO>;
