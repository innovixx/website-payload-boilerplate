/* eslint-disable no-console */
import { Payload } from 'payload';
import { User } from '../../collection';
import data from './data.json';

export const seedUsers = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding users...');

  await Promise.all(
    data.map(async (user) => {
      await payload.create({
        collection: User.slug,
        data: {
          ...user,
          password: 'Pa$$w0rd!',
          _id: user.id,
        },
      });
    }),
  );

  payload.logger.info('Users seeded.');
};