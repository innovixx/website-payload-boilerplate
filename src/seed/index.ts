import { Payload } from 'payload';
import { seedUsers } from './users';
import { seedMedia } from './media';

export const seed = async (payload: Payload): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    payload.logger.info('Seeding database...');

    await seedUsers(payload);
    await seedMedia(payload);

    payload.logger.info('Database Seeding Complete');
  } catch (err) {
    console.error(err);
    payload.logger.error('Error seeding database.');
  }
};
