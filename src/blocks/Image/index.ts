import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, CollectionSlug } from 'payload';

export const Image: Block = {
  fields: [
    {
      label: 'Image',
      name: 'image',
      relationTo: 'media' as CollectionSlug,
      required: true,
      type: 'upload',
    },
    {
      editor: lexicalEditor(),
      label: 'Caption',
      name: 'caption',
      type: 'richText',
    },
  ],
  labels: {
    plural: 'Images',
    singular: 'Image',
  },
  slug: 'image',
};
