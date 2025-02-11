import type { CollectionSlug, Payload } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import { Media } from '../../collection';
import data from './data.json';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const seedMedia = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding media...');

  await Promise.all(
    data.map(async (media) => {
      await payload.create({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        collection: Media.slug as CollectionSlug,
        data: {
          ...media,
          // @ts-expect-error _id is not in the type
          _id: media.id,
        },
        filePath: path.join(dirname, 'assets', media.filename),
      });
    }),
  );

  payload.logger.info('Seeding media...Done');
};
