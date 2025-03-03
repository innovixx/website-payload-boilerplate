import type { CollectionConfig, CollectionSlug, Document } from 'payload';
import { formatSlugValidateHook } from '../../utils/formatSlug';
import { Content, Image } from '../../blocks';

export const Page: CollectionConfig = {
	access: {
		read: (): boolean => true,
	},
	admin: {
		useAsTitle: 'title',
		preview: (doc: Document) => `${process.env.CLIENT_URL}/${doc?.slug}${doc?._status === 'draft' ? '?preview=true' : ''}`,
		defaultColumns: ['title', 'slug', 'createdAt'],
	},
	versions: {
		drafts: true,
		maxPerDoc: 5,
	},
	fields: [
		{
			label: 'Page Title',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Page Description',
			name: 'description',
			type: 'richText',
		},
		{
			type: 'tabs',
			admin: {
				condition: (_, siblingData) => !siblingData.isPlaceholder,
			},
			tabs: [
				{
					name: 'header',
					fields: [
						{
							name: 'type',
							type: 'select',
							options: [
								{
									label: 'Default',
									value: 'default',
								},
								{
									label: 'Featured Image',
									value: 'featuredImage',
								},
							],
							defaultValue: 'default',
							required: true,
						},
						{
							label: 'Featured Image',
							name: 'image',
							relationTo: 'media' as CollectionSlug,
							type: 'upload',
							admin: {
								condition: (_, siblingData) => siblingData.type === 'featuredImage',
							},
						},
					],
				},
				{
					name: 'layout',
					fields: [
						{
							blocks: [
								Content,
								Image,
							],
							label: 'Layout Blocks',
							minRows: 1,
							name: 'blocks',
							type: 'blocks',
							admin: {
								condition: (_, siblingData) => !siblingData.isPlaceholder,
							},
						},
					],
				},
			],
		},
		{
			admin: {
				position: 'sidebar',
				condition: (_, siblingData) => !siblingData.isPlaceholder,
			},
			hooks: {
				beforeValidate: [formatSlugValidateHook('title')],
			},
			label: 'Page Slug',
			name: 'slug',
			type: 'text',
		},
		{
			name: 'isPlaceholder',
			label: 'Placeholder Page',
			type: 'checkbox',
			defaultValue: false,
			admin: {
				description: 'Placeholder pages are auto-generated and cannot be configured. You can only update the title and meta data.',
				readOnly: true,
				condition: (_, siblingData) => !!siblingData.isPlaceholder,
				position: 'sidebar',
			},
		},
	],
	slug: 'page',
};
