import { CollectionSlug, Payload } from 'payload';
import { User } from '../../collection';
import data from './data.json';

export const seedUsers = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding users...');

  await Promise.all(
    data.map(async (user) => {
      await payload.create({
        collection: User.slug as CollectionSlug,
        data: {
          ...user,
          // @ts-expect-error _id is not in the type
          _id: user.id,
          password: 'Pa$$w0rd!',
        },
      });
    }),
  );

  payload.logger.info('Seeding users...Done');
};
