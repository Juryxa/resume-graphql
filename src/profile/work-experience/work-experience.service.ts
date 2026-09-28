import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { WorkExperience } from '../../graphql.js';

@Injectable()
export class WorkExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async getExperience(): Promise<WorkExperience[]> {
    try {
      return await this.prisma.workExperience.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить опыт работы');
    }
  }
}
