import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';
import { Media, Page, User } from './collection';
import { seed } from './seed';

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    user: User.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: require.resolve('./utils/mockPackage/index.js'),
        },
      },
    }),
  },
  collections: [Media, Page, User],
  cors: [
    `${process.env.CLIENT_URL}`,
    ...(process.env.NODE_ENV === 'development' ? ['https://studio.apollographql.com'] : []),
  ],
  db: mongooseAdapter({
    url: `${process.env.DATABASE_URI}`,
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'lib/schema.graphql'),
  },
  onInit: async (payload) => {
    if (
      process.env.NODE_ENV === 'development'
      && process.env.PAYLOAD_SEED_DATABASE
    ) {
      await seed(payload);
    }
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'lib/types.ts'),
  },
});
