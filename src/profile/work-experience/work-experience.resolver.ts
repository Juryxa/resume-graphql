import { Query, Resolver } from '@nestjs/graphql';
import { WorkExperienceService } from './work-experience.service.js';
import type { WorkExperience } from '../../graphql.js';

@Resolver('WorkExperience')
export class WorkExperienceResolver {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Query('experience')
  experience(): Promise<WorkExperience[]> {
    return this.workExperienceService.getExperience();
  }
}
