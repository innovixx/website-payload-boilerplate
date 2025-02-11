import type { Field, GroupField } from 'payload';
import { modalFields } from '@innovixx/payload-drawer-fields';

export const blockSetting = (overrides?: GroupField): Field => modalFields({
  ...overrides,
  name: 'blockSettings',
  toggleButtonType: 'blockSettingIcon',
  label: 'Block Settings',
  interfaceName: 'BlockSettings',
  fields: [
    ...overrides?.fields ?? [],
    {
      name: 'margin',
      type: 'group',
      fields: [
        {
          name: 'marginBottom',
          type: 'select',
          label: 'Margin Bottom',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Small',
              value: 'small',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Large',
              value: 'large',
            },
            {
              label: 'Extra Large',
              value: 'extraLarge',
            },
          ],
        },
      ],
    },
    {
      name: 'padding',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'paddingTop',
              type: 'select',
              label: 'Padding Top',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Small',
                  value: 'small',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'paddingBottom',
              type: 'select',
              label: 'Padding Bottom',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Small',
                  value: 'small',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'paddingLeft',
              type: 'select',
              label: 'Padding Left',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Small',
                  value: 'small',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'paddingRight',
              type: 'select',
              label: 'Padding Right',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Small',
                  value: 'small',
                },
                {
                  label: 'Medium',
                  value: 'medium',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
});
