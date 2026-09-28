import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Project } from '../../graphql.js';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjects(): Promise<Project[]> {
    try {
      const projects = await this.prisma.project.findMany();
      return projects.map((p) => ({ ...p, demoUrl: p.demoUrl ?? undefined }));
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить проекты');
    }
  }
}
