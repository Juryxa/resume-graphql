import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Profile, Project, Skill, WorkExperience } from '../graphql.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    try {
      return await this.prisma.profile.findFirstOrThrow({
        include: { projects: true, skills: true, workExperience: true },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Профиль не найден');
      }
      throw new InternalServerErrorException('Не удалось получить профиль');
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить проекты');
    }
  }

  async getSkills(): Promise<Skill[]> {
    try {
      return await this.prisma.skill.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить навыки');
    }
  }

  async getExperience(): Promise<WorkExperience[]> {
    try {
      return await this.prisma.workExperience.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить опыт работы');
    }
  }
}
