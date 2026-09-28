import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Project } from '../../generated/prisma/client.js';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjects(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить проекты');
    }
  }
}
