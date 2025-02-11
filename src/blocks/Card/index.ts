import type { Block } from 'payload';
import { Content } from '../Content';
import { Image } from '../Image';
import { blockSetting } from '../../fields/blockSetting';

export const CardWithBlocks: Block = {
  fields: [
    blockSetting(),
    {
      name: 'color',
      type: 'radio',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light', value: 'light' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    {
      name: 'hasBorder',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => siblingData.color === 'secondary',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        Content,
        Image,
      ],
    },
  ],
  slug: 'card-with-blocks',
};
