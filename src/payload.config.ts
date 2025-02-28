import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { CollectionSlug, Data } from 'payload';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { azureStorage } from '@payloadcms/storage-azure';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { Media, Page, User } from './collection';
import { seed } from './seed';
import { FooterMenu, HeaderMenu } from './globals';
import { initialisePages } from './tasks/initialisePages';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: User.slug,
		livePreview: {
			url: ({ data }: { collectionConfig?: { slug: CollectionSlug }; data: Data & { categories?: { slug: string }[] } }) => {
				const baseUrl = process.env.CLIENT_URL;

				const previewUrl = `${baseUrl}/${data.slug}`;

				return `${previewUrl}${data._status === 'draft' ? '?preview=true' : ''}`;
			},
			collections: ['page'],
		},
	},
	collections: [Media, Page, User],
	cors: [
		`${process.env.CLIENT_URL}`,
		...(process.env.NODE_ENV === 'development' ? ['https://studio.apollographql.com'] : []),
		...(process.env.APP_ENV !== 'production' ? ['http://localhost:3000'] : []),
	],
	db: mongooseAdapter({
		url: process.env.DATABASE_URI ?? '',
	}),
	editor: lexicalEditor({}),
	globals: [HeaderMenu, FooterMenu],
	graphQL: {
		schemaOutputFile: path.resolve(dirname, 'lib/schema.graphql'),
	},
	onInit: async (payload) => {
		initialisePages(payload);
		if (
			process.env.NODE_ENV === 'development'
			&& process.env.PAYLOAD_SEED_DATABASE
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
		seoPlugin({
			collections: [
				'page',
			] as CollectionSlug[],
			generateImage: ({ doc }) => doc.image || doc.header?.image,
			generateTitle: ({ doc }) => doc.title,
			uploadsCollection: 'media',
			fields: ({ defaultFields }) => ([
				...defaultFields,
				{
					name: 'noIndex',
					type: 'checkbox',
					label: 'No Index',
					admin: {
						description: 'Check this box to prevent search engines from indexing this page',
					},
				},
			]),
		}),
	],
	secret: process.env.PAYLOAD_SECRET ?? '',
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, 'lib/types.ts'),
	},
});
