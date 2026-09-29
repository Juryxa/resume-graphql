import { PrismaModule } from './prisma/prisma.module.js';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfileModule } from './profile/profile.module.js';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import GraphQLJSON from 'graphql-type-json';
import { DateTimeResolver } from 'graphql-scalars';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        customScalarTypeMapping: {
          DateTime: 'Date',
          JSON: 'Record<string, unknown>',
        },
      },
      graphiql: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        JSON: GraphQLJSON,
        DateTime: DateTimeResolver,
      },
    }),
    ProfileModule,
  ],
})
export class AppModule {}
