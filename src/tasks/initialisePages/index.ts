import type { Payload } from 'payload';
import { toSentenceCase } from '../../utils/changeCase';

export const initialisePages = async (payload: Payload): Promise<void> => {
	payload.logger.info('Initialising Pages');

	const requiredPages = [
		'home',
	];

	await Promise.all(
		requiredPages.map(async (slug) => {
			const existingPage = await payload.find({
				collection: 'page',
				where: {
					slug: {
						equals: slug,
					},
				},
			});

			if (existingPage.totalDocs === 0) {
				await payload.create({
					collection: 'page',
					data: {
						slug,
						title: toSentenceCase(slug),
					},
				});

				payload.logger.info(`Created page: ${slug}`);
			}
		}),
	);

	payload.logger.info('Initialised Pages');
};
