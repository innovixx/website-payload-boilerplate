import baseConfig from '@innovixx/eslint-config/config/configs/base/index.mjs';
import reactConfig from '@innovixx/eslint-config/config/configs/react/index.mjs';
import typescriptConfig from '@innovixx/eslint-config/config/configs/typescript/index.mjs';

export default [
	baseConfig,
	reactConfig,
	typescriptConfig,
	{
		ignores: [
			'src/app/(payload)/**',
			'src/lib/types.ts',
			'next.config.mjs',
			'payload-types.ts',
		],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
	},
];
