import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SkillService } from './skill.service.js';
import { ProfileLoader } from '../loaders/profile.loader.js';
import type { Profile, Skill } from '../../graphql.js';

@Resolver('Skill')
export class SkillResolver {
  constructor(
    private readonly skillService: SkillService,
    private readonly profileLoader: ProfileLoader,
  ) {}

  @Query('skills')
  skills(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }

  @ResolveField('profile')
  profile(@Parent() skill: Skill): Promise<Profile> {
    return this.profileLoader.batchProfiles.load('profile');
  }
}
