import type { GlobalConfig } from 'payload';
import { linkField } from '../../fields';

export const FooterMenu: GlobalConfig = {
	slug: 'footer-menu',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'menuGroups',
			label: 'Menu Groups',
			type: 'array',
			minRows: 1,
			maxRows: 4,
			fields: [
				{
					name: 'menuGroup',
					label: 'Menu Group',
					type: 'group',
					fields: [
						{
							name: 'title',
							label: 'Title',
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
		},
	],
};
