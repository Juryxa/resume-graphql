import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkExperienceService } from './work-experience.service.js';
import { ProfileLoader } from '../loaders/profile.loader.js';
import type { Profile, WorkExperience } from '../../graphql.js';

@Resolver('WorkExperience')
export class WorkExperienceResolver {
  constructor(
    private readonly workExperienceService: WorkExperienceService,
    private readonly profileLoader: ProfileLoader,
  ) {}

  @Query('experience')
  experience(): Promise<WorkExperience[]> {
    return this.workExperienceService.getExperience();
  }

  @ResolveField('profile')
  profile(@Parent() workExperience: WorkExperience): Promise<Profile> {
    return this.profileLoader.batchProfiles.load('profile');
  }
}
