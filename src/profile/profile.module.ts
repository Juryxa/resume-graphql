import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResolver } from './profile.resolver.js';
import { ProjectService } from './project/project.service.js';
import { ProjectResolver } from './project/project.resolver.js';
import { SkillService } from './skill/skill.service.js';
import { SkillResolver } from './skill/skill.resolver.js';
import { WorkExperienceService } from './work-experience/work-experience.service.js';
import { WorkExperienceResolver } from './work-experience/work-experience.resolver.js';
import { ProfileLoader } from './loaders/profile.loader.js';

@Module({
  providers: [
    ProfileService,
    ProfileResolver,
    ProjectService,
    ProjectResolver,
    SkillService,
    SkillResolver,
    WorkExperienceService,
    WorkExperienceResolver,
    ProfileLoader,
  ],
})
export class ProfileModule {}
