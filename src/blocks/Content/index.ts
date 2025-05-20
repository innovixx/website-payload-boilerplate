import type { Block } from 'payload';
import { blockSetting } from '../../fields';

export const Content: Block = {
	fields: [
		blockSetting(),
		{
			name: 'content',
			required: true,
			type: 'richText',
		},
	],
	interfaceName: 'Content',
	labels: {
		plural: 'Content Blocks',
		singular: 'Content',
	},
	slug: 'content',
};
