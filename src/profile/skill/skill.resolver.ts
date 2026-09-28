import { Query, Resolver } from '@nestjs/graphql';
import { SkillService } from './skill.service.js';
import type { Skill } from '../../graphql.js';

@Resolver('Skill')
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query('skills')
  skills(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }
}
