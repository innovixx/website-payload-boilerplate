import type { Payload } from 'payload';
import { seedUsers } from './users';
import { seedMedia } from './media';
import { seedPages } from './pages';
import { seedHeader } from './header';
import { seedFooter } from './footer';

export const seed = async (payload: Payload): Promise<void> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 10000));
		payload.logger.info('Seeding database...');

		await seedUsers(payload);
		await seedMedia(payload);
		await seedPages(payload);
		await seedHeader(payload);
		await seedFooter(payload);

		payload.logger.info('Seeding database...Done');
	} catch (err) {
		if (err instanceof Error) {
			payload.logger.error(`Error seeding database: ${err.message}`);
		} else {
			payload.logger.error('Error seeding database: Unknown error');
		}
	}
};
