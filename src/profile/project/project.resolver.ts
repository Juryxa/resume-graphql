import { ProjectService } from './project.service.js';
import { Query, Resolver } from '@nestjs/graphql';
import type { Project } from '../../graphql.js';

@Resolver('Project')
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query('projects')
  projects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }
}
