import type { GlobalConfig } from 'payload';
import { linkField } from '../../fields';

export const HeaderMenu: GlobalConfig = {
	slug: 'header-menu',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'links',
			label: 'Links',
			type: 'array',
			minRows: 1,
			maxRows: 10,
			fields: [
				linkField(),
			],
		},
	],
};
