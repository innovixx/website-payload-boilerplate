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
  },
  collections: [Media, Page, User],
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
