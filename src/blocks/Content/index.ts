import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const Content: Block = {
  fields: [
    {
      editor: lexicalEditor(),
      name: 'content',
      type: 'richText',
    },
  ],
  labels: {
    plural: 'Content Blocks',
    singular: 'Content',
  },
  slug: 'content',
};
