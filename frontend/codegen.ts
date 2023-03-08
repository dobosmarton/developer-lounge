import { loadEnvConfig } from '@next/env';
import { CodegenConfig } from '@graphql-codegen/cli';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  documents: ['./graphql/**/*.ts'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
