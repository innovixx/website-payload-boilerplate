import type { Payload } from 'payload';
import data from './data.json';
import { FooterMenu } from '../../globals';

export const seedFooter = async (payload: Payload): Promise<void> => {
	payload.logger.info('Seeding footer...');

	await payload.updateGlobal({
		slug: FooterMenu.slug as never,
		data: {
			...data,
			// @ts-expect-error _id is not in the type
			_id: data.id,
		},
	});

	payload.logger.info('Seeding footer...Done');
};
