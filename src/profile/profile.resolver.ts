import { Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Profile } from '../graphql.js';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query
  profile(): Promise<Profile> {}
}
