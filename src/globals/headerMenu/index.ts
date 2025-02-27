import type { GlobalConfig } from 'payload';

export const HeaderMenu: GlobalConfig = {
  slug: 'header-menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
        },
      ],
    },
  ],
};
