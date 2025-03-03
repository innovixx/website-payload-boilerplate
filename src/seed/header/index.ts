import type { Payload } from 'payload';
import { HeaderMenu } from '../../globals';
import data from './data.json';

export const seedHeader = async (payload: Payload): Promise<void> => {
	payload.logger.info('Seeding header...');

	await payload.updateGlobal({
		slug: HeaderMenu.slug as never,
		data: {
			...data,
			// @ts-expect-error _id is not in the type
			_id: data.id,
		},
	});

	payload.logger.info('Seeding header...Done');
};
