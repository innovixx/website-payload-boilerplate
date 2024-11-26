import { CollectionConfig } from 'payload';

export const User: CollectionConfig = {
  access: {
    read: (): boolean => true,
  },
  auth: true,
  fields: [
  ],
  slug: 'user',
};
