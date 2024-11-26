module.exports = {
  extends: [
    '@innovixx/eslint-config/configs/base',
    '@innovixx/eslint-config/configs/typescript',
  ],
  ignorePatterns: ['src/lib/types.ts', 'src/app/(payload)'],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-tabs': 0,
    'react/require-default-props': 0,
  },
};
