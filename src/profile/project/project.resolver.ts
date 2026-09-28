import { ProjectService } from './project.service.js';
import { ProfileLoader } from '../loaders/profile.loader.js';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type { Profile, Project } from '../../graphql.js';

@Resolver('Project')
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly profileLoader: ProfileLoader,
  ) {}

  @Query('projects')
  projects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @ResolveField('profile')
  profile(@Parent() project: Project): Promise<Profile> {
    return this.profileLoader.batchProfiles.load('profile');
  }
}