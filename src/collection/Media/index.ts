import path from 'path';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	access: {
		read: (): boolean => true,
	},
	fields: [
		{
			label: 'Alt Text',
			name: 'alt',
			required: true,
			type: 'text',
		},
	],
	slug: 'media',
	upload: {
		adminThumbnail: 'card',
		imageSizes: [
			{
				height: 480,
				name: 'card',
				width: 640,
			},
			{
				height: 576,
				name: 'feature',
				width: 1024,
			},
		],
		staticDir: path.join(process.cwd(), 'storage', 'media'),
	},
};
