import { Query, Resolver } from '@nestjs/graphql';
import type { Profile } from '../graphql.js';
import { ProfileService } from './profile.service.js';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query('profile')
  profile(): Promise<Profile> {
    return this.profileService.getProfile();
  }
}
