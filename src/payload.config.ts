import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionSlug, Data } from 'payload';
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
    livePreview: {
      url: ({ data, collectionConfig }: { collectionConfig?: { slug: CollectionSlug }; data: Data & { categories?: { slug: string }[] } }) => {
        const baseUrl = process.env.CLIENT_URL;

        let previewUrl = `${baseUrl}/${data.slug}`;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        if (collectionConfig?.slug === 'service' as CollectionSlug) {
          previewUrl = `${baseUrl}/services/${data.slug}`;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        } else if (collectionConfig?.slug === 'article' as CollectionSlug) {
          previewUrl = `${baseUrl}/articles/${data.categories?.[0].slug}/${data.slug}`;
        }

        return `${previewUrl}${data._status === 'draft' ? '?preview=true' : ''}`;
      },
      collections: [
        'page',
        'service',
        'article',
      ],
    },
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
    /*  seoPlugin({
      collections: [
        'page',
        'article',
        'service',
      ] as CollectionSlug[],
      generateImage: ({ doc }: { doc: { image?: string; header?: { image?: string } } }) => doc.image ?? doc.header?.image ?? '',
      generateTitle: ({ doc }: { doc: { title: string } }) => doc.title,
      uploadsCollection: 'media',
    }), */
  ],
  secret: process.env.PAYLOAD_SECRET ?? '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'lib/types.ts'),
  },
});
