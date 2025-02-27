import type { GlobalConfig } from 'payload';

export const FooterMenu: GlobalConfig = {
  slug: 'footer-menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      minRows: 1,
      maxRows: 5,
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
