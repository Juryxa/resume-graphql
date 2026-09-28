import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Profile } from '../graphql.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    try {
      const profile = await this.prisma.profile.findFirstOrThrow({
        include: { projects: true, skills: true, workExperience: true },
      });
      return {
        ...profile,
        linkedinUrl: profile.linkedinUrl ?? undefined,
        otherLinks:
          (profile.otherLinks as Record<string, unknown>) ?? undefined,
        projects: profile.projects.map((p) => ({
          ...p,
          demoUrl: p.demoUrl ?? undefined,
        })),
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Профиль не найден');
      }
      throw new InternalServerErrorException('Не удалось получить профиль');
    }
  }
}
