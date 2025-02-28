import type { Block } from 'payload';
import { Content } from '../Content';
import { Image } from '../Image';

export const CardWithBlocks: Block = {
	fields: [
		{
			name: 'color',
			type: 'radio',
			options: [
				{ label: 'White', value: 'white' },
				{ label: 'Light', value: 'light' },
				{ label: 'Secondary', value: 'secondary' },
			],
		},
		{
			name: 'blocks',
			type: 'blocks',
			blocks: [
				Content,
				Image,
			],
		},
	],
	slug: 'card-with-blocks',
};
