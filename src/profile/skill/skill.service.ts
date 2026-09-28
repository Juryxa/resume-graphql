import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Skill } from '../../graphql.js';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async getSkills(): Promise<Skill[]> {
    try {
      return await this.prisma.skill.findMany();
    } catch (e) {
      throw new InternalServerErrorException('Не удалось получить навыки');
    }
  }
}
