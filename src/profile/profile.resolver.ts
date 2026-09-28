import { Query, Resolver } from '@nestjs/graphql';
import type { Profile } from '../generated/prisma/client.js';
import { ProfileLoader } from './loaders/profile.loader.js';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileLoader: ProfileLoader) {}

  @Query('profile')
  profile(): Promise<Profile> {
    return this.profileLoader.batchProfiles.load('profile');
  }
}
