import { Injectable } from '@nestjs/common';

import { FilterJobOpportunitiesDto } from './dto/filter-job-opportunities.dto';
import { JobOpportunityService } from './job-opportunity.service';

@Injectable()
export class GetFilteredJobOpportunitiesUseCase {
  constructor(private readonly service: JobOpportunityService) {}

  async execute(filter: FilterJobOpportunitiesDto) {
    return this.service.filterJobOpportunities(filter);
  }
}
