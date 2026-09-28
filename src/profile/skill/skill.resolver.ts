import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SkillService } from './skill.service.js';
import { ProfileLoader } from '../loaders/profile.loader.js';
import type { Profile, Skill } from '../../generated/prisma/client.js';

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
