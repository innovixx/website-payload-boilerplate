/* eslint-disable no-console */
import { CollectionSlug, Payload } from 'payload';
import { Page } from '../../collection';
import data from './data.json';

export const seedPages = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding pages...');

  await Promise.all(
    data.map(async (page) => {
      await payload.create({
        collection: Page.slug as CollectionSlug,
        data: {
          ...page,
          // @ts-expect-error _id is not in the type
          _id: page.id,
        },
      });
    }),
  );

  payload.logger.info('Seeding pages...Done');
};
