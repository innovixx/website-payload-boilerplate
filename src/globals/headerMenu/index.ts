import type { GlobalConfig } from 'payload';
import { linkField } from '../../fields';

export const HeaderMenu: GlobalConfig = {
	slug: 'header-menu',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'menuGroups',
			type: 'array',
			minRows: 1,
			maxRows: 4,
			fields: [
				{
					name: 'text',
					label: 'Text',
					type: 'text',
				},
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
		},
	],
};
