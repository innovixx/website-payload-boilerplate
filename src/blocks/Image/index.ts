import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';
import { blockSetting } from '../../fields';

export const Image: Block = {
	fields: [
		blockSetting(),
		{
			label: 'Image',
			name: 'image',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			editor: lexicalEditor(),
			label: 'Caption',
			name: 'caption',
			type: 'richText',
		},
		{
			name: 'imageSize',
			type: 'select',
			options: [
				{
					label: 'Original',
					value: 'original',
				},
				{
					label: 'Feature',
					value: 'feature',
				},
				{
					label: 'Card',
					value: 'card',
				},
			],
			defaultValue: 'feature',
			required: true,
		},
	],
	labels: {
		plural: 'Images',
		singular: 'Image',
	},
	slug: 'image',
};
