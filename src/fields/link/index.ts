import type { CollectionSlug, Field } from 'payload';

export const linkField = (): Field => {
	const field: Field = {
		fields: [
			{
				fields: [
					{
						name: 'type',
						defaultValue: 'internal',
						options: [
							{
								label: 'Internal',
								value: 'internal',
							},
							{
								label: 'External',
								value: 'external',
							},
						],
						required: true,
						type: 'radio',
					},
					{
						admin: {
							width: '50%',
						},
						name: 'label',
						required: true,
						type: 'text',
					} as Field,
					{
						admin: {
							condition: (_, siblingData) => siblingData.type === 'internal',
							width: '50%',
						},
						maxDepth: 1,
						name: 'reference',
						relationTo: ['page'] as CollectionSlug[],
						type: 'relationship',
					},
					{
						admin: {
							condition: (_, siblingData) => siblingData.type === 'external',
							width: '50%',
						},
						name: 'url',
						type: 'text',
					},
				],
				type: 'row',
			},
		],
		interfaceName: 'Link',
		name: 'link',
		type: 'group',
	};

	return field;
};
