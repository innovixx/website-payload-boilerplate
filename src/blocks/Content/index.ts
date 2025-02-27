import type { Block } from 'payload';

export const Content: Block = {
  fields: [
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
