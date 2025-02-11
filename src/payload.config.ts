import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { azureStorage } from '@payloadcms/storage-azure';
import { Media, Page, User } from './collection';
import { seed } from './seed';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: User.slug,
  },
  collections: [Media, Page, User],
  cors: [
    `${process.env.CLIENT_URL}`,
    ...(process.env.NODE_ENV === 'development' ? ['https://studio.apollographql.com'] : []),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'lib/schema.graphql'),
  },
  onInit: async (payload) => {
    if (
      process.env.NODE_ENV === 'development'
      && (process.env.PAYLOAD_SEED_DATABASE === 'true' || process.env.PAYLOAD_SEED_DATABASE === '1')
    ) {
      await seed(payload);
    }
  },
  plugins: [
    azureStorage({
      allowContainerCreate: true,
      baseURL: `${process.env.AZURE_STORAGE_BASE_URL}`,
      collections: {
        [Media.slug]: true,
      },
      connectionString: `${process.env.AZURE_STORAGE_CONNECTION_STRING}`,
      containerName: `${process.env.AZURE_STORAGE_CONTAINER_NAME}`,
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'lib/types.ts'),
  },
});
