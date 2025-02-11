import type { Block } from 'payload';

export const Spacer: Block = {
  slug: 'spacer',
  fields: [
    {
      name: 'height',
      label: 'Height',
      type: 'number',
      required: true,
    },
  ],
};
