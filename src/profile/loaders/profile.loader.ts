import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProfileService } from '../profile.service.js';
import { Profile } from '../../generated/prisma/client.js';

@Injectable({ scope: Scope.REQUEST })
export class ProfileLoader {
  constructor(private readonly profileService: ProfileService) {}

  public readonly batchProfiles = new DataLoader<string, Profile>(
    async (profiles: readonly string[]) => {
      const profile = await this.profileService.getProfile();
      return profiles.map(() => profile);
    },
    { cache: true },
  );
}
