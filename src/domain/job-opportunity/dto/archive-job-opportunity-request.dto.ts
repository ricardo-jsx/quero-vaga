import { IsNumber } from 'class-validator';

export class ArchiveJobOpportunityRequestDto {
  @IsNumber()
  id: number;
}
