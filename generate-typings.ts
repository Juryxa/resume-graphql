import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [
    process.env.NODE_ENV === 'production'
      ? './dist/**/*.graphql'
      : './src/**/*.graphql',
  ],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  customScalarTypeMapping: {
    DateTime: 'Date',
    JSON: 'Record<string, unknown>',
  },
});
